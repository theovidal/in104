const tokens = require('../controllers/tokens');
const users = require('../controllers/users')
const jwt = require('jsonwebtoken');

// The authentication middleware checks if the user is connected :
// - if not, immediately stops the request
// - if yes, retrieves the user information and passes it to the routes using the res.locals dictionary
module.exports = async function authMiddleware(req, res, next) {
  // We don't check the token if :
  // - it's a CORS request (handled by the CORS middleware)
  // - the user wants to log in (POST /session)
  // - the user wants to refresh its JWT access token (PATCH /session)
  if (req.method === 'OPTIONS' || (req.url === '/session' && req.method !== 'GET')) {
    next();
    return;
  }
  res.locals.authenticated = false;

  const token = req.cookies.accessToken;

  if (token === undefined)
    return res.status(401).json({
      error: 'unauthenticated'
    });

  // Before checking any token, remove the expired ones
  //await tokens.removeExpiredTokens();

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async (err, payload) => {
    if (err) return res.status(403).json({
      error: 'invalid token'
    });

    const user = await users.getById(payload.id);
    delete user.passwordHash;
    res.locals.authenticated = true;
    res.locals.user = user;
    next()
  })
}
