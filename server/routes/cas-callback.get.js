const axios = require("axios");

module.exports = function callbackRoute(req, res) {
  console.log(req.query.ticket)

  res.send()

  // https://cascad.ensta.fr/serviceValidate?service=https%3A%2F%2Fwww.example.org%2Flogin%2Fcas%2Fcallback%3Fticket=ST-1920-pc53Sa5huQJAew3w5pGg-cascad
}