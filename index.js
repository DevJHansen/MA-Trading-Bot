global.fetch = require("node-fetch");
const indicators = require("./indicators");
const get = require("./get");

var ma9;
var ma21;

function checkBuyOrSell() {
  if (ma9 > ma21) {
    get.checkLongPosition();
  } else {
    get.checkShortPosition();
  }
}

module.exports.runBot = function() {
  indicators.movingAverage21(function(result) {
    ma21 = result;

    indicators.movingAverage9(function(result) {
      ma9 = result;
      console.log("");
      console.log("=================================");
      console.log("9MA:", ma9);
      console.log("21MA", ma21);
      console.log("");
      checkBuyOrSell();
    });
  });
};
