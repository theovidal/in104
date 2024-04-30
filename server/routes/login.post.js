const db = require('../../db/models');
const users = require('../controllers/users');
const tokens = require('../controllers/tokens');
const crypto = require('crypto');

// Route where users can authenticate using an email and password
// Will return their token and data if success, or an error if their credentials are invalid
module.exports = async function loginRoute(req, res) {
  if (res.locals.authenticated) {
    res.json(res.locals.user);
  } else {
    const email = req.body.email;
    const password = req.body.password;

    const test = await users.testCredentialsByEmail(email, password)
    if (!test) {
      res.status(403).json({
        error: 'invalid email and/or password'
      })
      return;
    }

    const expiration = new Date();
    expiration.setDate(expiration.getDate() + 7);

    const user = await users.getByEmail(email);
    const token = await tokens.create(user.id, crypto.randomBytes(30).toString('hex'), expiration)
    delete user.passwordHash;

    res.status(201).json({
      token,
      user,
    })
  }
}
