module.exports = function loginRoute(req, res) {
  if (res.locals.authenticated) {
    res.json(res.locals.user);
  } else {
    const email = req.body.email;
    const password = req.body.password;

    // TODO: check the provided email and password against the database

    const result = checkUser(email, password);

    if (result.found) {
      res.cookie('token', result.token, {signed: true}).json(result.user);
    } else {
      res.status(403).send();
    }
  }
}

function checkUser(email, password) {
  return {
    found: true,
    token: 'abcabc',
    user: {
      name: 'John Doe'
    }
  };
}