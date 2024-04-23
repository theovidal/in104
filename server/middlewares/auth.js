module.exports = function authMiddleware(req, res, next) {
  res.locals.authenticated = false;

  const token = req.signedCookies.token;

  // Token can either be :
  // - undefined, if non existent
  // - false, if the signed token has been altered
  if (token === undefined || token === false) {
    if (req.url !== '/login') {
      res.status(401).clearCookie('token');
      throw new Error('unauthenticated');
    }
  } else {
    const result = checkToken(token);
    if (result.found) {
      res.locals.user = result.user;
      res.locals.authenticated = true;
    } else {
      res.clearCookie('token').status(401);
      throw new Error('expired token');
    }
  }

  next();
}

// TODO: check in the database the value of the cookie
function checkToken(token) {
  return {
    found: true,
    user: {
      name: 'John Doe',
      role: 'professeur'
    }
  };
}