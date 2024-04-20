const utils = require('./utils');
const axios = require("axios");

test('logout without being logged in', async () => {
  const response = await axios.post(`${utils.baseUrl}/logout`, {}, {
    validateStatus: () => true // We want the request to fail
  });
  expect(response.status).toBe(401);
  expect(response.data).toEqual({
    error: 'unauthenticated'
  });
})