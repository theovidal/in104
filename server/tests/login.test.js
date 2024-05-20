const { request } = require('./utils')

test('login with the wrong email', async () => {
  const response = await request.post(`/session`, {
    email: 'theo.vidal@taep.fr',
    password: 'taep'
  }, {
    validateStatus: () => true // We want the request to fail
  });
  expect(response.status).toBe(403)
  expect(response.data).toEqual({
    error: 'invalid email and/or password'
  })
});

test('login with the wrong password', async () => {
  const response = await request.post(`/session`, {
    email: 'theo.vidal@ensta-paris.fr',
    password: 'idkidk'
  });
  console.log(response.data)
  expect(response.status).toBe(403)
  expect(response.data).toEqual({
    error: 'invalid email and/or password'
  })
});

test('login with the right credentials, then logout', async () => {
  const response = await request.post(`/session`, {
    email: 'theo.vidal@ensta-paris.fr',
    password: 'taep'
  });
  expect(response.status).toBe(201);
  expect(response.data.email).toBe('theo.vidal@ensta-paris.fr');

  expect(response.headers['set-cookie'].length).toBeGreaterThan(0)
  expect(response.headers['set-cookie'][0]).toMatch(/accessToken=s%.*/)
  expect(response.headers['set-cookie'][1]).toMatch(/refreshToken=s%.*/)

  const profileResponse = await request.get('/session', {
    headers: {
      Cookie: response.headers['set-cookie'].join('; ')
    }
  })
  expect(profileResponse.status).toBe(200);
  expect(profileResponse.data.email).toBe('theo.vidal@ensta-paris.fr');

  // Then logout to destroy this token
  const logoutResponse = await request.delete(`/session`);
  expect(logoutResponse.status).toBe(204);

  // and try to reauthenticate again
  const reauthResponse = await request.get(`/session`, {
    validateStatus: () => true // We want the request to fail
  });
  expect(reauthResponse.status).toBe(401);
  expect(reauthResponse.data).toEqual({
    error: 'unauthenticated'
  })
});

test('logout without being logged in', async () => {
  const response = await request.delete(`/session`, {
    validateStatus: () => true // We want the request to fail
  });
  expect(response.status).toBe(401);
  expect(response.data).toEqual({
    error: 'unauthenticated'
  });
})


