const tokens = require('../controllers/tokens')

// Manually log-out the user
module.exports = async function logoutRoute(req, res) {
  const token = req.headers.authentication;
  const id = req.headers.id;

  // Auth middleware has verified the token and user ID, so this request is legitimate
  await tokens.remove(id, token);
  res.status(204).send();
}