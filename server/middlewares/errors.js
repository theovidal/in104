module.exports = function errorHandlingMiddleware(err, req, res, _) {
  res.json({
    error: err.message
  });
}