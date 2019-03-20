const CryptoCompareAPI = require("cryptocompare");
const CCAPIKey = "XXXXXXXXXXXXXXXXXXXXXX";
CryptoCompareAPI.setApiKey(CCAPIKey);

module.exports = {
  movingAverage21: function(callback) {
    CryptoCompareAPI.histoDay("BTC", "USD")
      .then(data => {
        data = data.reverse();
        var sum = 0;
        for (var i = 0; i < 21; i++) {
          sum += data[i].close;
        }

        var MA21 = sum / 21;
        callback(MA21);
      })
      .catch(console.error);
  },

  movingAverage9: function(callback) {
    CryptoCompareAPI.histoDay("BTC", "USD")
      .then(data => {
        data = data.reverse();
        var sum = 0;
        for (var i = 0; i < 9; i++) {
          sum += data[i].close;
        }

        var MA9 = sum / 9;
        callback(MA9);
      })
      .catch(console.error);
  }
};
