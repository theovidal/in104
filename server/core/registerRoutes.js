const path = require('path');
const fs = require('fs');

const routesPath = path.join(__dirname, '../routes');

// Automatic routes import from the /routes folder, with the format :
// path.method.js
module.exports = function registerRoutes(app) {
  fs.readdir(routesPath, function (err, files) {
    if (err) throw new Error('Unable to scan directory: ' + err);

    files.forEach(function (file) {
      import(`../routes/${file}`).then((module) => {
        const match = file.match(/(.*)\.(.*)\.js/);
        const path = match[1];
        const method = match[2];

        switch (method) {
          case 'get':
            app.get(`/${path}`, module.default);
            break;
          case 'post':
            app.post(`/${path}`, module.default);
            break;
          default:
            throw new Error(`unsupported method for route: ${method}`);
        }
      })
    })
  })
}