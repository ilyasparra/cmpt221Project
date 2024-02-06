
exports.getCryptoData = function () {
    return (CryptoData);
}

class CryptoData {
    constructor(cryptoCurrencies = null, sort = null, sortDirection = null, Results = [], Query = null) {
        if (cryptoCurrencies === null) {
            this.cryptoCurrencies = [];
        } else {
            this.cryptoCurrencies = cryptoCurrencies;
        }

        this.sortAttribute = sort;
        this.sortDirection = sortDirection;
        this.Results = Results;
        this.Query = Query;
        this.currentCrypto = cryptoCurrencies;
    }

    getCryptoDetails(id) {
        // gets details by id, or in this case rank. will edit this later when needed 
        // Ranks may change, so it would be better to use the symbol
        return this.cryptoCurrencies.find(crypto => crypto["rank"] == id);
      }
    // sort method which sorts by ascending and descending order
    sort(coinAttribute) {
        if (coinAttribute === this.sortAttribute && this.sortDirection === "ascending") {
            this.sortDirection = "descending";
        } else {
            this.sortDirection = "ascending";
        }

        this.sortAttribute = coinAttribute;

        // Sorting the cryptocurrencies based on the given attribute
        this.cryptoCurrencies.sort((a, b) => {
            const valueA = a[coinAttribute];
            const valueB = b[coinAttribute];

            // Check if the values are strings representing numbers and convert them to actual numbers
            const numA = isNaN(valueA) ? valueA : parseFloat(valueA);
            const numB = isNaN(valueB) ? valueB : parseFloat(valueB);

            if (this.sortDirection === "ascending") {
                if (numA < numB) return -1;
                if (numA > numB) return 1;
            } else {
                if (numA > numB) return -1;
                if (numA < numB) return 1;
            }
            return 0;
        });
    }
// search method which searches for the criteria, using the attribute and query for the output
    search(coinAttribute, searchQuery){
        const resultCoins = [];
        if(typeof this.cryptoCurrencies[0][coinAttribute] === "number"){
            for(let crypto of this.cryptoCurrencies){
                // You should account for other search criteria, such as "less than" or "greater than"
                if (crypto[coinAttribute] === searchQuery){
                    resultCoins.push(crypto);
                }
            }
        }else {
            for(let crypto of this.cryptoCurrencies){
                if (crypto[coinAttribute].toUpperCase().startsWith(searchQuery.toUpperCase())){
                    resultCoins.push(crypto);
                }
            }
        }
        return resultCoins;
    }
}
// cryptocurrencies
const cryptoAPIS = require('../crypto_example.json')["data"]
const cryptos = []
for (let i = 0; i < cryptoAPIS.length; i++) {
    const apiDict = cryptoAPIS[i]

    const apiQuoteUSD = apiDict["quote"]["USD"]
    const cryptoObject = {
        "rank": apiDict["cmc_rank"],
        "name": apiDict["name"],
        "symbol": apiDict["symbol"],
        "price": apiQuoteUSD["price"],
        "change": apiQuoteUSD["percent_change_24h"],
        "marketCap": apiQuoteUSD["market_cap"],
        "supply": apiDict["total_supply"],
        "volume": apiQuoteUSD["volume_24h"],
        "vwap": apiQuoteUSD["vwap"],
        "priceHistory": [],

    }
    cryptos.push(cryptoObject);
}

// Here we update table with live data when already being familiar with data used for the previous tables created
const axios = require('axios');
  // Method to update cryptoCurrencies with live data
  const fetchCryptoData = async () => {
    try {
        const response = await axios.get('https://sandbox-api.coinmarketcap.com/v1/cryptocurrency/listings/latest', {
            headers: {
                'X-CMC_PRO_API_KEY': 'e70ee9a6-806d-4a76-8842-4726dd20b4d6', // API key that was achieved from making account
            },
        });

        const liveData = response.data.data || []; // Extract the relevant data property

        // Update the existing cryptos array with live data
        for (let i = 0; i < liveData.length; i++) {
            const apiDict = liveData[i];
            // Similar logic as before to extract necessary data
            const cryptoObject = {
                "rank": apiDict["cmc_rank"],
                "name": apiDict["name"],
                "symbol": apiDict["symbol"],
                "price": apiDict["quote"]["USD"]["price"],
                "change": apiDict["quote"]["USD"]["percent_change_24h"],
                "marketCap": apiDict["quote"]["USD"]["market_cap"],
                "supply": apiDict["total_supply"],
                "volume": apiDict["quote"]["USD"]["volume_24h"],
                "vwap": apiDict["quote"]["USD"]["vwap"],
                "priceHistory": [],
            };
            // Check if the cryptocurrency with the same rank already exists in the cryptos array
            const existingCryptoIndex = cryptos.findIndex(crypto => crypto.rank === cryptoObject.rank);
            if (existingCryptoIndex !== -1) {
                cryptos[existingCryptoIndex] = cryptoObject;
            } else {
                cryptos.push(cryptoObject);
            }
        }

        console.log('Live data:', cryptos);
    } catch (error) {
        console.error('API request error:', error);
    }
};

// Fetch live data every 2 minutes
setInterval(fetchCryptoData, 2 * 60 * 1000); // 2 minutes in milliseconds


let standardCryptoData = new CryptoData(cryptos)
exports.standardCryptoData = standardCryptoData;






