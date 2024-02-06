// table data used for the first data table in the home.html file
let tableData = [
    { Rank: 1, Name: "Bitcoin", Symbol: "BTC", Price: "60000", Change: "3", MarketCap: "1200000000000", Supply: "18000000", Volume: "50000000000", VWAP: "59500" },
    { Rank: 2, Name: "Ethereum", Symbol: "ETH", Price: "3000", Change: "4", MarketCap: "350000000000", Supply: "116000000", Volume: "40000000000", VWAP: "2900" },
    { Rank: 3, Name: "Ripple", Symbol: "XRP", Price: "1.50", Change: "-2", MarketCap: "150000000000", Supply: "100000000000", Volume: "10000000000", VWAP: "1.55" },
    { Rank: 4, Name: "Cardano", Symbol: "ADA", Price: "2.20", Change: "6", MarketCap: "70000000000", Supply: "31000000000", Volume: "5000000000", VWAP: "2.10" },
    { Rank: 5, Name: "Solana", Symbol: "SOL", Price: "150", Change: "8", MarketCap: "45000000000", Supply: "300000000", Volume: "3000000000", VWAP: "145" },
    { Rank: 6, Name: "Polkadot", Symbol: "DOT", Price: "30", Change: "5", MarketCap: "25000000000", Supply: "840000000", Volume: "2000000000", VWAP: "28" },
    { Rank: 7, Name: "Litecoin", Symbol: "LTC", Price: "180", Change: "2", MarketCap: "12000000000", Supply: "66000000", Volume: "1000000000", VWAP: "175" },
    { Rank: 8, Name: "Chainlink", Symbol: "LINK", Price: "25", Change: "7", MarketCap: "10000000000", Supply: "400000000", Volume: "800000000", VWAP: "23" },
    { Rank: 9, Name: "Stellar", Symbol: "XLM", Price: "0.75", Change: "-1", MarketCap: "7500000000", Supply: "10000000000", Volume: "600000000", VWAP: "0.78" }
];

// the following function iterates in each row and adds the table data with a for loop, along with when a row is clicked on-
// I added an eventListener to send the user to the details, which will later be taken care of in future projects
function init() {
    let table = document.getElementById("table1");
    //let headers = document.getElementById("table1").querySelector("thead").querySelectorAll("th");

    //headers.forEach(header => {
    //   header.addEventListener("click", function () {
    //       const columnName = header.getAttribute("id");
    //       handleSort(columnName);
    //   });
    //});

    for (const row of tableData) {
        let tr = document.createElement("tr");
        for (const attr in row) {
            let td = document.createElement("td");
            td.innerHTML = row[attr];
            td.setAttribute("name", attr);
            tr.appendChild(td);
        }
        tr.addEventListener("click", function () { window.location.href = "/detail" });
        table.appendChild(tr);
    }

    // allows for when the columns are clicked on they are sorted, by passing a function which sorts the columns by -
    // both if it's a number and if it's a string
    document.getElementById("Rank").addEventListener("click", function () { handleSort("Rank", true) });
    document.getElementById("Name").addEventListener("click", function () { handleSort("Name", false) });
    document.getElementById("Symbol").addEventListener("click", function () { handleSort("Symbol", false) });
    document.getElementById("Price").addEventListener("click", function () { handleSort("Price", true) });
    document.getElementById("Change").addEventListener("click", function () { handleSort("Change", true) });
    document.getElementById("MarketCap").addEventListener("click", function () { handleSort("MarketCap", true) });
    document.getElementById("Supply").addEventListener("click", function () { handleSort("Supply", true) });
    document.getElementById("Volume").addEventListener("click", function () { handleSort("Volume", true) });
    document.getElementById("VWAP").addEventListener("click", function () { handleSort("VWAP", true) });
}

// function which sorts rows by String using localCompare
function sortTableString(id, data) {
    let rows = data.querySelectorAll("tr");
    rows = Array.prototype.slice.call(rows);
    rows.sort(function (a, b) {
        let desiredColA = a.querySelector(`[name="${id}"]`).innerText;
        let desiredColB = b.querySelector(`[name="${id}"]`).innerText;
        return desiredColA.localeCompare(desiredColB);
    });
    return rows;
}

// function which sorts rows by number by using Number()
function sortTableNumber(id, data) {
    let rows = data.querySelectorAll("tr");
    rows = Array.prototype.slice.call(rows);
    rows.sort(function (a, b) {
        let desiredColA = Number(a.querySelector(`[name="${id}"]`).innerText);
        let desiredColB = Number(b.querySelector(`[name="${id}"]`).innerText);
        return desiredColA - desiredColB;
    });
    return rows;
}

// Creates an event listener that correlates with the buy button
let buyButton = document.getElementById('Buy');
buyButton.addEventListener('click', function (event) {
    event.preventDefault(); // Prevent the form from submitting

    let selectedQuantity = document.getElementById('Quantity').value;

    // Gathers the real date and time of the currency bought
    let realDate = new Date();
    let formattedDateTime = realDate.toLocaleString();

    if (selectedQuantity) {
        let crypto = tableData[0]; // Replace with the selected row's data
        // Call the buyCurrency function to make the purchase
        buyCurrency(selectedQuantity, crypto.Symbol);

        // Show the alert without sessionStorage
        alert(`You bought ${selectedQuantity} of selected currency on ${formattedDateTime}`);
    }
});

//${crypto.Name}

document.addEventListener('DOMContentLoaded', function () {
    // Get the modal and button elements
    var modal = document.getElementById("myModal");
    var closeButton = document.querySelector(".close");
    var tableBody = document.getElementById("table1");

    // Attach click event listener to each table row
    tableBody.addEventListener('click', function (event) {
        var target = event.target;
        if (target.tagName === 'TD' && target.parentNode.tagName === 'TR') {
            openModal(target.parentNode); // Pass the clicked row to openModal function
        }
    });

    // Close the modal when the close button is clicked
    closeButton.addEventListener('click', function () {
        closeModal();
    });

    // Function to open the modal with data from the clicked row
    function openModal(row) {
        var modalTable = document.getElementById("modalCryptoTable");

        // Clear existing content in modal table
        modalTable.innerHTML = '';

        // Iterate through the cells of the clicked row and populate the modal table
        for (var i = 0; i < row.cells.length; i++) {
            var cellValue = row.cells[i].textContent;
            var modalRow = modalTable.insertRow();
            var modalCell = modalRow.insertCell(0);
            modalCell.textContent = cellValue;
        }

        // Show the modal
        modal.style.display = "block";

        // Show the modal
        modal.style.display = "block";
    }

    // Function to close the modal
    function closeModal() {
        modal.style.display = "none";
    }
});



// Function to handle logout
function handleLogout() {
    // Clear the 'username' cookie
    document.cookie = 'username=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';

    // redirects user
    window.location.href = '/home'; // redirects to home page where the user can click the log in
}

// Attach the handleLogout function to the logout button
var logoutButton = document.getElementById('Logout');
if (logoutButton) {
    logoutButton.addEventListener('click', handleLogout);
}

// Function to handle sorting fetch for sorting the cryptocurrencies
function handleSort(column) {
    fetch('/api/cryptoData/sort', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ attribute: column }),
    })
        .then((response) => response.json())
        .then((data) => {

            populateTable(data);
        })
        .catch((error) => {
            console.error('Sort fetch error:', error);
        });
}

// Function to make a PATCH request to buy a cryptocurrency
function buyCurrency(amount, symbol) {
    fetch(`/api/portfolio/buy/${symbol}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ "quantity": amount })
    })
    .then(response => response.json())
    .then(data => {
        // Handle the response, update the UI, or perform other actions
        handleBuyResponse(data);
    })
    .catch(error => {
        console.error('Error buying currency:', error);
    });
}

// Function to handle the response after buying a currency
function handleBuyResponse(data) {
    console.log("Currency bought successfully:", data);

}

// Function to populate the table with crypto data
function populateTable(data) {
    const table = document.getElementById('table1');
    // Clear existing table content
    table.innerHTML = '';
    data.forEach(crypto => {
        const tr = document.createElement('tr');
        for (const key in crypto) {
            const td = document.createElement('td');
            td.textContent = crypto[key];
            tr.appendChild(td);
        }
        table.appendChild(tr);
    });
}

// add fetch 
fetch('/api/cryptoData/')
    .then(response => response.json())
    .then(data => {
        populateTable(data);
    })
    .catch(error => {
        console.error('Fetch error:', error);
    });

// Update the table with live data every 10 seconds
window.setInterval(function () {
    fetch('/api/cryptoData/')
        .then(response => response.json())
        .then(data => {
            populateTable(data);
        })
        .catch(error => {
            console.error('Fetch error:', error);
        });
}, 10000); // 10 seconds in milliseconds

populateTable();








