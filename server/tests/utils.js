const axios = require('axios')
const https = require('https')

exports.newInstance = function() {
  return axios.create({
    httpsAgent: new https.Agent({
      rejectUnauthorized: false,
    }),
    headers: {
      'Content-Type': 'application/json'
    },
    baseURL: 'https://localhost:8080/api',
    withCredentials: true,
    validateStatus: () => true // Sometimes, we want requests to fail (and in all cases, we always check the status code of the response)
  })
}

exports.request = exports.newInstance()