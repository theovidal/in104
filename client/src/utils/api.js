const apiUrl = 'http://147.250.229.99:8080'

const endpoints = {
  login: apiUrl + '/login',
  profile: apiUrl + '/profile',
  createCode: apiUrl + '/create-code',
  scanCode: apiUrl + '/scan-code',
}

function request(url, method = 'GET', params = undefined) {
  return fetch(url, {
    method: method,
    headers: {
      'Content-Type': 'application/json',
      'Authentication': localStorage.getItem('token')
    },
    body: JSON.stringify(params)
  })
}

export {apiUrl, endpoints, request}