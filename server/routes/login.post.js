const db = require('../../db/models')

// Route where users can authenticate using an email and password
// Will return their token and data if success, or an error if their credentials are invalid
module.exports = function loginRoute(req, res) {
  if (res.locals.authenticated) {
    res.json(res.locals.user);
  } else {
    const email = req.body.email;
    const password = req.body.password;

    // TODO: check the provided email and password against the database

    const result = checkUser(email, password);

    if (result.found) {
      res.status(201).json({
        token: result.token,
        user: result.user
      });
    } else {
      res.status(403).json({
        error: 'invalid email and/or password'
      })
    }
  }
}

// Check if the email and password are matching one user, and if so, create a new authentication token
function checkUser(email, password) {
  if (email === 'john@example.com' && password === 'john')
    return {
      found: true,
      token: 'abcabc',
      user: {
        firstname: 'Théo',
        lastname: 'Vidal',
        email: 'theo.vidal@ensta-paris.fr',
        role: 'professeur'
      }
    };
  else return {
    found: false
  }
}