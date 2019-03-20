const fetch = require("node-fetch");
const crypto = require("crypto");
const qs = require("qs");
const post = require("./post");
const text = require("./text");
const index = require("./index");

const apiKey = "XXXXXXXXX";
const apiSecret = "XXXXXXXXXXXXXX";

function makeRequest(verb, endpoint, data = { symbol: "XBTUSD" }) {
  const apiRoot = "/api/v1/";

  const expires = Math.round(new Date().getTime() / 1000) + 60; // 1 min in the future

  let query = "",
    postBody = "";
  if (verb === "GET") query = "?" + qs.stringify(data);
  else postBody = JSON.stringify(data);

  const signature = crypto
    .createHmac("sha256", apiSecret)
    .update(verb + apiRoot + endpoint + query + expires + postBody)
    .digest("hex");

  const headers = {
    "content-type": "application/json",
    accept: "application/json",
    "api-expires": expires,
    "api-key": apiKey,
    "api-signature": signature
  };

  const requestOptions = {
    method: verb,
    headers
  };
  if (verb !== "GET") requestOptions.body = postBody; // GET/HEAD requests can't have body

  const url = "https://testnet.bitmex.com" + apiRoot + endpoint + query;

  return fetch(url, requestOptions)
    .then(response => response.json())
    .then(
      response => {
        if ("error" in response) throw new Error(response.error.message);
        return response;
      },
      error => console.error("Network error", error)
    );
}

module.exports = {
  checkLongPosition: function() {
    (async function position() {
      try {
        const result = await makeRequest("GET", "position", {
          symbol: "XBTUSD"
        });
        if (result[0].isOpen === false) {
          post.buySide();
          text.buy();
        } else if (result[0].isOpen === true && result[0].currentQty > 0) {
          console.log("Position Already Open");
          index.runBot();
        } else {
          post.closeShort();
          post.buySide();
          text.buy();
          console.log("Close current & open new");
        }
      } catch (e) {
        index.runBot();
        console.error(e);
      }
    })();
  },

  checkShortPosition: function() {
    (async function position() {
      try {
        const result = await makeRequest("GET", "position", {
          symbol: "XBTUSD"
        });
        if (result[0].isOpen === false) {
          post.sellSide();
          text.sell();
        } else if (result[0].isOpen === true && result[0].currentQty < 0) {
          console.log("Position Already Open");
          index.runBot();
        } else {
          post.closeLong();
          post.sellSide();
          text.sell();
          console.log("Close current & open new");
        }
      } catch (e) {
        index.runBot();
        console.error(e);
      }
    })();
  }
};
