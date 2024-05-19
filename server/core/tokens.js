const jwt = require('jsonwebtoken')

function generateToken (id, email, role, expiration, secret) {
  return jwt.sign({
    id, email, role,
  }, secret, { expiresIn: expiration });
}

exports.generateAccessToken = function (id, email, role) {
  return generateToken(id, email, role, `${process.env.ACCESS_TOKEN_EXPIRATION}s`, process.env.ACCESS_TOKEN_SECRET);
}

exports.generateRefreshToken = function (id, email, role) {
  return generateToken(id, email, role, `${process.env.REFRESH_TOKEN_EXPIRATION}d`, process.env.REFRESH_TOKEN_SECRET);
}
