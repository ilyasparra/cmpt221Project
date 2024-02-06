const cryptoDataController = require('./controllers/cryptoController');
const portfolioController = require('./controllers/portfolioController');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
var multer = require('multer');
var upload = multer();


const path = require('path')
const express = require('express')
const mysql = require('mysql2/promise')
const app = express()
app.set("view engine", "ejs");
app.set('views', path.join(__dirname, '../Client/views'))
app.use(express.json())
app.use(express.static('Client/public'));
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));
// setup cookie parser
app.use(cookieParser());
app.use(upload.array());
app.use(express.static('public'));

const port = 1337

// Database configuration
const dbConfig = {
  host: 'localhost',
  user: 'root',
  password: 'ilyasito',
  database: 'crypto',
};

const secrets = require('crypto');
const hashPassword = password => {
  return secrets.createHash('sha256').update(password).digest('hex')
}

async function createUser(username, password, firstname, lastname, DOB) {
  const connection = await mysql.createConnection(dbConfig);

  // Hash the password before storing it in the database
  const hashedPassword = hashPassword(password);

  await connection.query('INSERT INTO account (username, password, firstname, lastname, DOB) VALUES (?, ?, ?, ?, ?)',
    [username, hashedPassword, firstname, lastname, DOB]);

  await connection.end();
}

async function findUserByUsername(username) {
  const connection = await mysql.createConnection(dbConfig);

  const [rows] = await connection.query('SELECT * FROM account WHERE username = ?', [username]);

  await connection.end();

  return rows[0];
}

app.post('/register', async function (req, res) {
  const { username, password, confirmPassword, firstname, lastname, DOB } = req.body;
  console.log(req.body)
  // Check if the username is already taken
  const existingUser = await findUserByUsername(username);
  if (existingUser) {
    // Handle appropriately 
    res.redirect('/login');
    return;
  }

  // Check if the password and confirmed password match
  if (password !== confirmPassword) {
    // Handle password mismatch (e.g., redirect with an error message)
    res.redirect('/login');
    return;
  }


  // Create a new user
  await createUser(username, password, confirmPassword, firstname, lastname, DOB);

  // cookie username  

  res.cookie('username', username, {
    maxAge: 5000,
    // expires is the same as maxAge
    expires: new Date(Date.now() + 1000 * 60 * 15),
    secure: true,
    httpOnly: true,
    sameSite: 'strict'
  });


  res.redirect('/home'); // Redirect to home page after successful registration
});

app.post('/login', async function (req, res) {
  const { username, password } = req.body;

  // Find the user by username
  const user = await findUserByUsername(username);

  if (user && hashPassword(password) === user.password) {
    // Valid credentials, set session variable 
    res.cookie('username', username, {
      maxAge: 1000 * 60 * 15
    });
    res.redirect('/home'); // Redirect to home page after successful login
  } else {
    // Invalid credentials, handle appropriately 
    res.redirect('/login'); // Redirect back to the login page
  }

}

);


// routes 
app.get('/', function (req, res) {

  res.sendFile('index.html', { root: './Client/views' })
})

app.get('/home', function (req, res) {
  const cookieCheck = req.cookies
  const data = { "isLoggedInUser": cookieCheck !== null && cookieCheck['username'] }
  res.render('home', data)
})

app.get('/detail', function (req, res) {
  res.sendFile('detail.html', { root: './Client/views' })
})

app.get('/portfolio', function (req, res) {
  res.sendFile('portfolio.html', { root: './Client/views' })
})

app.get('/account', async function (req, res) {
  const cookieCheck = req.cookies
  const isCookie = cookieCheck !== null && cookieCheck['username']
  if (!isCookie) {
    res.redirect('/login')
  }
  const account = await findUserByUsername(cookieCheck['username'])
  console.log(account)
  const data = {
    "username": account.username,
    "firstname": account.firstname,
    "lastname": account.lastname,
    "DOB": account.DOB,
    // other items go here
  }

  // Pass 'data'
  res.render('account', data)
})

app.get('/login', function (req, res) {
  res.sendFile('login.html', { root: './Client/views' })
})

app.get('/register', function (req, res) {
  res.sendFile('register.html', { root: './Client/views' })
})

app.post('/login', function (req, res) {
  res.sendFile('login.html', { root: './Client/views' })
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

//API Routes
app.route('/api/cryptoData/:id')
  .get(cryptoDataController.viewDetail)

app.route('/api/cryptoData')
  .get(cryptoDataController.getCurrencies)

app.route('/api/cryptoData/search')
  .post(cryptoDataController.searchCurrencies)

app.route('/api/cryptoData/sort')
  .post(cryptoDataController.sortCurrencies)

app.route('/api/portfolio')
  .get(portfolioController.getPortfolio)

app.route('/api/portfolio/:id')
  .patch(portfolioController.addCrypto)
  .delete(portfolioController.removeCrypto)






