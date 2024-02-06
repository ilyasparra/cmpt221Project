const mysql = require('mysql2/promise')

async function createConnection() {
    return await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'ilyasito',
    })
}

exports.createConnection = createConnection