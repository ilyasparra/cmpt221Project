exports.getTracker = function () {
    return (Tracker);
}


class Tracker {
    constructer(previousHistory) {
        this.previousHistory = previousHistory;
    }
}