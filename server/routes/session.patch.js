const jwt = require('jsonwebtoken')
const tokens = require('../core/tokens')

module.exports = function refreshSession(req, res) {
  const exp = new RegExp('Bearer (.*)')
  const info = exp.exec(req.headers['authorization']);

  if (info === null) {
    return res.status(403).json({
      error: 'invalid token'
    });
  }
  const token = info[1];

  jwt.verify(token, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
    console.log(err)
    if (err) return res.sendStatus(403).json({
        error: 'invalid token'
      })

    delete user.iat;
    delete user.exp;
    const refreshedToken = tokens.generateAccessToken(user.id, user.email, user.role);
    res.send({
      accessToken: refreshedToken,
    });
  });
}