const portfolioModel = require('../models/Portfolio');

exports.addCrypto = (req, res, ) => {
    const id = req.params.id;
    const {count} = req.body;

    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(portfolioModel.testUser.addCrypto(id, count)));
}

exports.removeCrypto = (req, res, ) => {
    const id = req.params.id;
    const {count} = req.body;

    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(portfolioModel.testUser.sellCrypto(id, count)));
}

exports.getPortfolio = (req, res, ) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(portfolioModel.testUser.cryptoList));
}

exports.getPortfolioValue = (req, res, ) => {

}

exports.getPortfolioValueHistory = (req, res, ) => {

}