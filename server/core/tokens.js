const jwt = require('jsonwebtoken')

// Generate a new JTW with encapsulated data
function generateToken (id, email, role, expiration, secret) {
  return jwt.sign({
    id, email, role,
  }, secret, { expiresIn: expiration });
}

// Util to generate access tokens using the configuration in the .env
exports.generateAccessToken = function (id, email, role) {
  return generateToken(id, email, role, `${process.env.ACCESS_TOKEN_EXPIRATION}s`, process.env.ACCESS_TOKEN_SECRET);
}

// Util to generate refresh tokens using the configuration in the .env
exports.generateRefreshToken = function (id, email, role) {
  return generateToken(id, email, role, `${process.env.REFRESH_TOKEN_EXPIRATION}d`, process.env.REFRESH_TOKEN_SECRET);
}
