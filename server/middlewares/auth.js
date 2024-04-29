// The authentication middleware checks if the user is connected :
// - if not, immediately stops the request
// - if yes, retrieves the user information and passes it to the routes using the res.locals dictionary
module.exports = function authMiddleware(req, res, next) {
  // Would be a CORS request
  if (req.method === 'OPTIONS') {
    next()
    return
  }
  res.locals.authenticated = false;

  const token = req.headers['authentication']

  const result = checkToken(token);
  if (result.found) {
    res.locals.user = result.user;
    res.locals.authenticated = true;
  } else {
    res.status(401);
    throw new Error('unauthenticated');
  }

  next();
}

// TODO: check in the database the value of the token
function checkToken(token) {
  if (token !== 'abcabc') return {
    found: false
  }

  return {
    found: true,
    user: {
      firstname: 'Théo',
      lastname: 'Vidal',
      email: 'theo.vidal@ensta-paris.fr',
      role: 'professeur'
    }
  };
}