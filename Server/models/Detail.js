exports.getCryptoCurrency = function () {
    return (CryptoCurrency);
}

class CryptoCurrency {
    constructer(rank, name, symbol, price = [], change, marketCap, supply, volume , vwap, priceHistory = []) {
        this.rank = rank;
        this.name = name;
        this.symbol = symbol;
        this.price = price;
        this.change = change;
        this.marketCap = marketCap;
        this.supply = supply;
        this.volume = volume;
        this.vwap = vwap;
        this.priceHistory = priceHistory;
    }
}