const { request } = require('./utils')

test('scanning chain', async () => {
  const pupilAuth = await request.post('/session', {
    email: 'theo.vidal@ensta-paris.fr',
    password: 'taep'
  })

  const teacherAuth = await request.post('/session', {
    email: 'laurent.bourgeois@ensta-paris.fr',
    password: 'abcd'
  })

  const code = await request.post('/codes', {
    lectureId: 1
  }, {
    headers: {
      Cookie: teacherAuth.headers['set-cookie'].join('; ')
    }
  })
  expect(code.status).toBe(201);
  expect(code.data).toHaveProperty('code')

  const scan = await request.patch('/presences', {
    code: code.data.code
  }, {
    headers: {
      Cookie: pupilAuth.headers['set-cookie'].join('; ')
    }
  })
  expect(scan.status).toBe(204);
  expect(scan.data).toBe('')
})

test('create a code outside of the lecture', async () => {
  const teacherAuth = await request.post('/session', {
    email: 'laurent.bourgeois@ensta-paris.fr',
    password: 'abcd'
  })

  const code = await request.post('/codes', {
    lectureId: 2
  }, {
    headers: {
      Cookie: teacherAuth.headers['set-cookie'].join('; ')
    }
  })
  expect(code.status).toBe(403);
  expect(code.data.error).toBe('Horaire incompatible');
})
