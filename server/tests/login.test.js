const axios = require('axios');
const utils = require('./utils');

test('login with the wrong email', async () => {
  const response = await axios.post(`${utils.baseUrl}/login`, {
    email: 'theo.vidal@taep.fr',
    password: 'abcabc'
  }, {
    headers: {
      'Content-Type': 'application/json'
    },
    validateStatus: () => true // We want the request to fail
  });
  expect(response.status).toBe(403)
  expect(response.data).toEqual({
    error: 'invalid email and/or password'
  })
});

test('login with the wrong password', async () => {
  const response = await axios.post(`${utils.baseUrl}/login`, {
    email: 'theo.vidal@ensta-paris.fr',
    password: 'idkidk'
  }, {
    headers: {
      'Content-Type': 'application/json'
    },
    validateStatus: () => true // We want the request to fail
  });
  expect(response.status).toBe(403)
  expect(response.data).toEqual({
    error: 'invalid email and/or password'
  })
});

test('login with the right credentials, then logout', async () => {
  const response = await axios.post(`${utils.baseUrl}/login`, {
    email: 'theo.vidal@ensta-paris.fr',
    password: 'abcabc'
  }, {
    headers: {
      'Content-Type': 'application/json'
    }
  });
  expect(response.status).toBe(201);
  expect(response.data.user.email).toBe('theo.vidal@ensta-paris.fr');

  // Then logout to destroy this token
  const logoutResponse = await axios.post(`${utils.baseUrl}/logout`, {}, {
    headers: {
      'Authentication': response.data.token.token,
      'Id': response.data.user.id
    }
  });
  expect(logoutResponse.status).toBe(204);

  // and try to reauthenticate again
  const profileResponse = await axios.get(`${utils.baseUrl}/profile`, {
    headers: {
      'Authentication': response.data.token.token,
      'Id': response.data.user.id
    },
    validateStatus: () => true // We want the request to fail
  });
  expect(profileResponse.status).toBe(403);
  expect(profileResponse.data).toEqual({
    error: 'invalid token'
  })
});
