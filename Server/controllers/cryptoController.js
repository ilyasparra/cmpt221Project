const cryptoDataModel = require('../models/CryptoData')

exports.viewDetail = (req, res) => {
    const id = req.params.id;
  
    // Add logic to fetch details for the specified cryptocurrency
    // Example:
    const cryptoDetail = cryptoDataModel.standardCryptoData.getCryptoDetails(id);
    res.setHeader('Content-Type', 'application/json');
    if (cryptoDetail) {
        res.send(JSON.stringify(cryptoDetail))
    } else {
      res.status(404).json({ message: 'Cryptocurrency not found' });
    }
};

exports.getCurrencies = (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    
    // Use slice to limit the number of cryptocurrencies sent (first 50)
    const slicedCryptoCurrencies = cryptoDataModel.standardCryptoData.cryptoCurrencies.slice(0, 50);
    
    res.send(JSON.stringify(slicedCryptoCurrencies));
}

exports.sortCurrencies = (req, res, ) => {

    const sortAttribute = req.body["attribute"]
    cryptoDataModel.standardCryptoData.sort(sortAttribute)
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(cryptoDataModel.standardCryptoData.cryptoCurrencies))

}

exports.searchCurrencies = (req, res, ) => {
    const {attribute, query} = req.body
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(cryptoDataModel.standardCryptoData.search(attribute, query)))
}
