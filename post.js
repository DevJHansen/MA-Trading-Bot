var request = require("request");
var crypto = require("crypto");
const index = require("./index");

var apiKey = "XXXXXXXXXXXX";
var apiSecret = "XXXXXXXXXXXXXX";

var verb = "POST",
  path = "/api/v1/order",
  expires = Math.round(new Date().getTime() / 1000) + 60, // 1 min in the future
  data = { symbol: "XBTUSD", orderQty: 230, ordType: "Market" },
  dataSell = { symbol: "XBTUSD", orderQty: -230, ordType: "Market" },
  dataCloseLong = {
    symbol: "XBTUSD",
    orderQty: -230,
    ordType: "Market"
  },
  dataCloseShort = {
    symbol: "XBTUSD",
    orderQty: 230,
    ordType: "Market"
  };

//If you don't do this, you might get differently-sorted keys and blow the signature.

//Buy side
var postBody = JSON.stringify(data);

var signatureBuy = crypto
  .createHmac("sha256", apiSecret)
  .update(verb + path + expires + postBody)
  .digest("hex");

var buyHeader = {
  "content-type": "application/json",
  Accept: "application/json",
  "X-Requested-With": "XMLHttpRequest",
  "api-expires": expires,
  "api-key": apiKey,
  "api-signature": signatureBuy
};

const buySide = {
  headers: buyHeader,
  url: "https://testnet.bitmex.com/api/v1/order",
  method: "POST",
  body: postBody
};

//Sell side
var postBodySell = JSON.stringify(dataSell);

var signatureSell = crypto
  .createHmac("sha256", apiSecret)
  .update(verb + path + expires + postBodySell)
  .digest("hex");

var sellHeader = {
  "content-type": "application/json",
  Accept: "application/json",
  "X-Requested-With": "XMLHttpRequest",
  "api-expires": expires,
  "api-key": apiKey,
  "api-signature": signatureSell
};

const sellSide = {
  headers: sellHeader,
  url: "https://testnet.bitmex.com/api/v1/order",
  method: "POST",
  body: postBodySell
};

//CloseLong
var postBodyCloseLong = JSON.stringify(dataCloseLong);

var signatureCloseLong = crypto
  .createHmac("sha256", apiSecret)
  .update(verb + path + expires + postBodyCloseLong)
  .digest("hex");

var closeLongHeader = {
  "content-type": "application/json",
  Accept: "application/json",
  "X-Requested-With": "XMLHttpRequest",
  "api-expires": expires,
  "api-key": apiKey,
  "api-signature": signatureCloseLong
};

const closeLong = {
  headers: closeLongHeader,
  url: "https://testnet.bitmex.com/api/v1/order",
  method: "POST",
  body: postBodyCloseLong
};

//CloseShort
var postBodyCloseShort = JSON.stringify(dataCloseShort);

var signatureCloseShort = crypto
  .createHmac("sha256", apiSecret)
  .update(verb + path + expires + postBodyCloseShort)
  .digest("hex");

var closeShortHeader = {
  "content-type": "application/json",
  Accept: "application/json",
  "X-Requested-With": "XMLHttpRequest",
  "api-expires": expires,
  "api-key": apiKey,
  "api-signature": signatureCloseShort
};

const closeShort = {
  headers: closeShortHeader,
  url: "https://testnet.bitmex.com/api/v1/order",
  method: "POST",
  body: postBodyCloseShort
};

//Exports
module.exports = {
  buySide: function() {
    request(buySide, function(error, response, body) {
      if (error) {
        console.log(error);
      }
      console.log("Buy Executed");
    });
    index.runBot();
  },

  sellSide: function() {
    request(sellSide, function(error, response, body) {
      if (error) {
        console.log(error);
      }
      console.log("Sell Executed");
    });
    index.runBot();
  },

  closeLong: function() {
    request(closeLong, function(error, response, body) {
      if (error) {
        console.log(error);
      }
      console.log("Close Executed");
    });
  },

  closeShort: function() {
    request(closeShort, function(error, response, body) {
      if (error) {
        console.log(error);
      }
      console.log("Close Executed");
    });
  }
};
