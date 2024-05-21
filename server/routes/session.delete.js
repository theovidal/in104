// Totally clear the user session, i.e. remove their related cookies
module.exports = function clearSession(req, res) {
  res.clearCookie('accessToken');
  res.clearCookie('refreshToken');
  res.status(204).send()
}