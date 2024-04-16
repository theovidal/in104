module.exports = function logoutRoute(req, res) {
  // TODO: remove the token in the database

  res.clearCookie('token').status(204).send();
}
