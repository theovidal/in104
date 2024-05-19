const users = require('../controllers/users');
const dayjs = require('dayjs')
const tokens = require('../core/tokens')

// Route where users can authenticate using an email and password
// Will return their token and data if success, or an error if their credentials are invalid
module.exports = async function createSession(req, res) {
  if (res.locals.authenticated) {
    res.json(res.locals.user);
  } else {
    const email = req.body.email;
    const password = req.body.password;

    try {
      await users.testCredentialsByEmail(email, password)

      const user = await users.getByEmail(email);
      const accessToken = tokens.generateAccessToken(user.id, user.email, user.role);
      const refreshToken = tokens.generateRefreshToken(user.id, user.email, user.role);
      delete user.passwordHash;

      res.cookie('accessToken', accessToken, {
        httpOnly: true,
        secure: true,
        expires: dayjs().add(process.env.ACCESS_TOKEN_EXPIRATION, 'seconds').toDate()
      });
      res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        secure: true,
        expires: dayjs().add(process.env.REFRESH_TOKEN_EXPIRATION, 'days').toDate()
      });
      res.status(201).json({
        ...user,
      })
    } catch (err) {
      console.log(err)
      res.status(403).json({
        error: 'invalid email and/or password'
      })
    }
  }
}
