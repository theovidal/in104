module.exports = function errorHandlingMiddleware(err, req, res, _) {
  res.status(400).json({
    error: err.message
  });
}