const axios = require('axios');
const utils = require('./utils');

test('login with the wrong email', async () => {
  const response = await axios.post(`${utils.baseUrl}/login`, {
    email: 'idkidk',
    password: 'john'
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
    email: 'john@example.com',
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
    email: 'john@example.com',
    password: 'john'
  }, {
    headers: {
      'Content-Type': 'application/json'
    }
  });
  expect(response.status).toBe(201)
  expect(response.data).toEqual({
    name: 'John Doe'
  })
  expect(response.headers['set-cookie'].length).toBeGreaterThan(0)
  expect(response.headers['set-cookie'][0]).toMatch(/token=s%.*; Path=\//)

  const logoutResponse = await axios.post(`${utils.baseUrl}/logout`, {}, {
    headers: {
      Cookie: response.headers['set-cookie'][0]
    }
  });
  expect(logoutResponse.status).toBe(204);
});
