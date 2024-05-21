const apiUrl = `${window.location.origin}/api`

const endpoints = {
  session: apiUrl + '/session',
  presences: apiUrl + '/presences',
  lectures: apiUrl + '/lectures',
  codes: apiUrl + '/codes',
  courses: apiUrl + '/courses'
}

// request is a utility to make requests using the fetch API
// so when a body needs to be passed, it's automatically parsed as JSON
function request(url, method = 'GET', params = undefined) {
  return fetch(url, {
    method,
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(params),
  })
}

export {apiUrl, endpoints, request}