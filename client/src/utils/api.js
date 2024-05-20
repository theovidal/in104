const apiUrl = `${window.location.origin}/api`

const endpoints = {
  session: apiUrl + '/session',
  presences: apiUrl + '/presences',
  lectures: apiUrl + '/lectures',
  codes: apiUrl + '/codes',
  courses: apiUrl + '/courses'
}

function request(url, method = 'GET', params = undefined) {
  return fetch(url, {
    method: method,
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(params),
  })
}

export {apiUrl, endpoints, request}