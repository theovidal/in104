// The error middleware is placed at the end of the request chain, and catches the errors routes of middlewares
// could have thrown to display them properly to the client
module.exports = function errorHandlingMiddleware(err, req, res, _) {
  res.json({
    error: err.message
  });
}