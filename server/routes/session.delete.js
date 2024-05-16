const tokens = require('../controllers/tokens')

// Manually log-out the user
module.exports = async function deleteSession(req, res) {
  const token = req.headers['authentication'];

  // Auth middleware has verified the token and user ID, so this request is legitimate
  await tokens.remove(token);
  res.status(204).send();
}