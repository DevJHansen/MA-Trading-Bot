const axios = require("axios");

var chatID = 12345678;
var key = "XXXXXXXXXXXXXXXXXXXXX";
var buyMessage = "Long";
var sellMessage = "Short";

module.exports = {
  buy: () => {
    axios
      .post(
        `https://api.telegram.org/bot${key}/sendMessage?chat_id=${chatID}&text=${buyMessage}`
      )
      .then(() => {
        console.log("Message Sent");
      })
      .catch(() => {
        console.log("Message Not Sent");
      });
  },

  sell: () => {
    axios
      .post(
        `https://api.telegram.org/bot${key}/sendMessage?chat_id=${chatID}&text=${sellMessage}`
      )
      .then(() => {
        console.log("Message Sent");
      })
      .catch(() => {
        console.log("Message Not Sent");
      });
  }
};
