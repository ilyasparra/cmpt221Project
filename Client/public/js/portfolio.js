// allows for when the user presses the spacebar down they get sent to the index.html file
window.addEventListener("keydown", spaceClicked2, false)

function spaceClicked2(evt) {
    if (evt.keyCode == "32") {
        window.location.replace("/");
    }
}
// the following is the tableData for the second table in this project which is for the portfolio.html file
let tableData = [
    { Name: "Bitcoin", Symbol: "BTC", Price: "60000", Change: "3", PurchaseAmount: "1200000000000", PurchasePrice: "18000000", PurchaseValue: "50000000000", CurrentValue: "59500", PercentChange: "60"},
    { Name: "Ethereum", Symbol: "ETH", Price: "3000", Change: "4", PurchaseAmount: "350000000000", PurchasePrice: "116000000", PurchaseValue: "40000000000", CurrentValue: "2900", PercentChange: "75"},
    { Name: "Ripple", Symbol: "XRP", Price: "1.50", Change: "-2", PurchaseAmount: "150000000000", PurchasePrice: "100000000000", PurchaseValue: "10000000000", CurrentValue: "1.55", PercentChange: "-10"},
    { Name: "Cardano", Symbol: "ADA", Price: "2.20", Change: "6", PurchaseAmount: "70000000000", PurchasePrice: "31000000000", PurchaseValue: "5000000000", CurrentValue: "2.10", PercentChange: "33"},
    { Name: "Solana", Symbol: "SOL", Price: "150", Change: "8", PurchaseAmount: "45000000000", PurchasePrice: "300000000", PurchaseValue: "3000000000", CurrentValue: "145", PercentChange: "20"},
    { Name: "Polkadot", Symbol: "DOT", Price: "30", Change: "5", PurchaseAmount: "25000000000", PurchasePrice: "840000000", PurchaseValue: "2000000000", CurrentValue: "28", PercentChange: "16"},
    { Name: "Litecoin", Symbol: "LTC", Price: "180", Change: "2", PurchaseAmount: "12000000000", PurchasePrice: "66000000", PurchaseValue: "1000000000", CurrentValue: "175", PercentChange: "5"},
    { Name: "Chainlink", Symbol: "LINK", Price: "25", Change: "7", PurchaseAmount: "10000000000", PurchasePrice: "400000000", PurchaseValue: "800000000", CurrentValue: "23", PercentChange: "28"},
    { Name: "Stellar", Symbol: "XLM", Price: "0.75", Change: "-1", PurchaseAmount: "7500000000", PurchasePrice: "10000000000", PurchaseValue: "600000000", CurrentValue: "0.78", PercentChange: "-25"},
];

// does the same function as in home.js by iterating the rows and adding the tableData
function init() {
    let table = document.getElementById("table1");
    for (const row of tableData) {
        let tr = document.createElement("tr");
        for (attr in row) {
            let td = document.createElement("td");
            td.innerHTML = row[attr];
            td.setAttribute("name", attr)
            tr.appendChild(td)
        }
        tr.addEventListener("click", function(){window.location.href = "/detail" })
        table.appendChild(tr);
    }
// does the same as home.js and makes each of the columns clickable and they get sorted by either Number or String
    document.getElementById("Name").addEventListener("click", function () { sortTableNumber("Name") })
    document.getElementById("Symbol").addEventListener("click", function () { sortTableString("Symbol") })
    document.getElementById("Price").addEventListener("click", function () { sortTableString("Price") })
    document.getElementById("Change").addEventListener("click", function () { sortTableNumber("Change") })
    document.getElementById("PurchaseAmount").addEventListener("click", function () { sortTableNumber("PurchaseAmount") })
    document.getElementById("PurchasePrice").addEventListener("click", function () { sortTableNumber("PurchasePrice") })
    document.getElementById("PurchaseValue").addEventListener("click", function () { sortTableNumber("PurchaseValue") })
    document.getElementById("CurrentValue").addEventListener("click", function () { sortTableNumber("CurrentValue") })
    document.getElementById("PercentChange").addEventListener("click", function () { sortTableNumber("PercentChange") })
    document.getElementById("returnMessage").addEventListener("click", function () { window.location.href = "/" })

}
// sorts by String
function sortTableString(id) {
    let table = document.getElementById("table1");
    let rows = table.querySelectorAll("tr");
    rows = Array.prototype.slice.call(rows)
    rows.sort(function (a, b) {
        let desiredColA = a.querySelector(`[name="${id}"]`).innerText
        let desiredColB = b.querySelector(`[name="${id}"]`).innerText
        return desiredColA.localeCompare(desiredColB);
    })
    table.innerHTML = '';
    for (let row of rows) {
        table.appendChild(row);
    }
}
// sorts by Number
function sortTableNumber(id) {
    let table = document.getElementById("table1");
    let rows = table.querySelectorAll("tr");
    rows = Array.prototype.slice.call(rows)
    rows.sort(function (a, b) {
        let desiredColA = Number(a.querySelector(`[name="${id}"]`).innerText)
        let desiredColB = Number(b.querySelector(`[name="${id}"]`).innerText)
        return desiredColA - desiredColB;
    })
    table.innerHTML = '';
    for (let row of rows) {
        table.appendChild(row);
    }
}


