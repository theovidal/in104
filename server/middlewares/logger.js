// The logger middleware logs all the incoming requests and their path
// TODO: log into a dedicated file
module.exports = function (path) {
  return function loggerMiddleware(req, res, next) {
    console.log(`${new Date().toString()} ‒ ${req.ip} to ${req.url}`);
    next();
  }
}