// Get all the user information ; also serves for the client to check if the user is authenticated
module.exports = function getSession(req, res) {
  res.json(res.locals.user);
}
