module.exports = function profileRoute(req, res) {
  res.json(res.locals.user);
}
