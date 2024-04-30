const tokens = require('../controllers/tokens');
const users = require('../controllers/users')

// The authentication middleware checks if the user is connected :
// - if not, immediately stops the request
// - if yes, retrieves the user information and passes it to the routes using the res.locals dictionary
module.exports = async function authMiddleware(req, res, next) {
  // Would be a CORS request
  if (req.method === 'OPTIONS' || req.url === '/login') {
    next();
    return;
  }
  res.locals.authenticated = false;

  const token = req.headers['authentication'];
  const id = req.headers['id'];

  if (id === undefined || tokens === undefined) {
    res.status(401).json({
      error: 'unauthenticated'
    });
    return;
  }

  // Before checking any token, remove the expired ones
  await tokens.removeExpiredTokens(id);

  try {
    if (await tokens.test(id, token)) {
      const data = await users.getById(id);
      delete data.passwordHash;

      res.locals.user = data;
      res.locals.authenticated = true;
      next();
    } else throw new Error()
  } catch (_) {
    res.status(403).json({
      error: 'invalid token'
    });
  }
}
