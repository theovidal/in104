const jwt = require('jsonwebtoken')
const tokens = require('../core/tokens')
const dayjs = require('dayjs')

module.exports = function refreshSession(req, res) {
  const token = req.cookies.refreshToken
  if (token === undefined)
    return res.status(401).json({
      error: 'unauthenticated'
    });

  jwt.verify(token, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
    console.log(err)
    if (err) {
      res.clearCookie('accessToken');
      res.clearCookie('refreshToken')
      return res.sendStatus(403).json({
        error: 'invalid token'
      })
    }

    delete user.iat;
    delete user.exp;
    const accessToken = tokens.generateAccessToken(user.id, user.email, user.role);
    res.cookie('accessToken', accessToken, {
      httpOnly: true,
      secure: true,
      expires: dayjs().add(process.env.ACCESS_TOKEN_EXPIRATION, 'seconds').toDate()
    });
    res.status(204).send()
  });
}