const users = require('../controllers/users')
const jwt = require('jsonwebtoken');

// The authentication middleware checks if the user is connected :
// - if not, immediately stops the request
// - if yes, retrieves the user information and passes it to the routes using the res.locals dictionary
module.exports = async function authMiddleware(req, res, next) {
  res.locals.authenticated = false;
  // We don't check the token if :
  // - it's not a request for the API (for instance, it's for the client)
  // - it's a CORS request (handled by the CORS middleware)
  // - the user wants to log in (POST /session)
  // - the user wants to refresh its JWT access token (PATCH /session)
  if (!req.url.startsWith('/api') || req.method === 'OPTIONS' || (req.url === '/api/session' && req.method !== 'GET')) return next();

  const token = req.signedCookies.accessToken;

  if (token === undefined)
    return res.status(401).json({
      error: 'unauthenticated'
    });

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async (err, payload) => {
    if (err) {
      res.clearCookie('accessToken');
      return res.status(403).json({
        error: 'invalid token'
      });
    }

    const user = await users.getById(payload.id);
    delete user.passwordHash;
    res.locals.authenticated = true;
    res.locals.user = user;
    next()
  })
}
