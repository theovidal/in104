const request = require('request')

const baseUrl = 'http://localhost:8080'

test('login with the wrong email', () => {
  request.post({
    url: `${baseUrl}/login`,
    form: {
      email: 'idkidk',
      password: 'john'
    }
  }, (err, response, body) => {
    expect(err).toBeNull()
    expect(response.statusCode).toBe(403)
    expect(JSON.parse(body)).toEqual({
      error: 'invalid email and/or password'
    })
  })
});

test('login with the wrong password', () => {
  request.post({
    url: `${baseUrl}/login`,
    form: {
      email: 'john@example.com',
      password: 'idkidk'
    }
  }, (err, response, body) => {
    expect(err).toBeNull()
    expect(response.statusCode).toBe(403)
    expect(JSON.parse(body)).toEqual({
      error: 'invalid email and/or password'
    })
  })
});

test('login with the right credentials', () => {
  request.post({
    url: `${baseUrl}/login`,
    form: {
      email: 'john@example.com',
      password: 'john'
    }
  }, (err, response, body) => {
    expect(err).toBeNull()
    expect(response.statusCode).toBe(200)
    expect(response.headers['set-cookie'].length).toBeGreaterThan(0)
    expect(response.headers['set-cookie'][0]).toMatch(/token=s%.*; Path=\//)
    expect(JSON.parse(body)).toEqual({
      name: 'John Doe'
    })
  })
});
