const cryptoDataModel = require('./CryptoData')

exports.getPortfolio = function () {
    return (Portfolio);
}
//module.exports = Portfolio;

class Portfolio {
    constructor() {
        this.cryptoList = [];
        this.history  = [];
    }

    addCrypto(id, count){
        // Maybe rank is not the best way to identify a crypto
        let addedCrypto = cryptoDataModel.standardCryptoData.getCryptoDetails(id);
        if(addedCrypto){
            for(let i=0; i < count; i++){
                this.cryptoList.push(addedCrypto)
            }
            return "Success";
        }
        return "Failure";
    }

    sellCrypto(id, count){
        let addedCrypto = cryptoDataModel.standardCryptoData.getCryptoDetails(id);
        if(addedCrypto){
            for(let i=0; i < count; i++){
                // change if id is made
                let nextSellIndex = null;
                for(let j=0; j < this.cryptoList.length; j++){
                    if(this.cryptoList[j]["rank"] == id){
                        nextSellIndex = j;
                        break;
                    }
                }
                if(nextSellIndex === null) { 
                    return "Failure"; 
                }
                this.cryptoList.splice(nextSellIndex, 1);
            }
            return "Success";
        }
        return "Failure";
    }

    
}

exports.testUser = new Portfolio()

