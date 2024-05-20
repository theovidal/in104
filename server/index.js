const express = require('express');
const cors = require('cors');
const app = express();
const seedDatabase = require('./core/seed')
const history = require('connect-history-api-fallback');

// Importing all the values stored in the .env
require('dotenv').config();

// CORS (Cross-Origin resource sharing) policy middleware, to enable the client to interact with the API
// https://developer.mozilla.org/fr/docs/Web/HTTP/CORS
app.use(cors({
  credentials: true,
  allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept'],
  //origin: process.env.API_URL
}))
app.options('*', cors()) // include before other routes

// Cookie parsing middleware, to have access to them with req.cookies
const cookieParser = require('cookie-parser');
app.use(cookieParser(process.env.COOKIE_SECRET));

// Body parsing middlewares, to have access to it with req.body
app.use(express.json());                                  // for parsing application/json
app.use(express.urlencoded({ extended: true }));  // for parsing application/x-www-form-urlencoded*/

// Authentication middleware, to check every incoming request and populate user data if logged in
const authMiddleware = require('./middlewares/auth');
app.use(authMiddleware);

// Logging middleware, to report every incoming request
const logger = require('./middlewares/logger');
app.use(logger(process.env.LOGS));

// Helper to register every route located in the /routes directory
const registerRoutes = require('./core/registerRoutes');
registerRoutes(app);

// Strategies to manage the client :
// - proxy to the Vite server if in development ;
// - serve static files of in production.
const proxy = require('express-http-proxy');
const notApiRegex = /^((?!api).)*$/

if (process.env.NODE_ENV !== 'production') {
  app.all(/.*/, function(req, res, next) {
    if (req.url.startsWith('/api')) next()
    else proxy(`http://localhost:${process.env.FRONT_PORT}`)(req, res, next);
  })
} else {
  app.use(express.static(process.env.FRONT_BUILD_PATH));
  app.use(history({
    disableDotRule: true,
    verbose: true,
    rewrites: [
      {
        from: /^\/api\/.*$/,
        to: function(context) {
          return context.parsedUrl.path
        }
      }
    ]
  }));
  app.use(express.static(process.env.FRONT_BUILD_PATH));
}


// Error handling middleware, to return formatted errors to the user
const errorHandler = require('./middlewares/errors');
app.use(errorHandler);

const db = require("../db");

const https = require('https');
const fs = require('fs')
// Loading local certificates (for development purposes only)
let privateKey = fs.readFileSync('server/ssl/RootCA.key', 'utf8');
let certificate = fs.readFileSync('server/ssl/RootCA.crt', 'utf8');

exports.run = function() {
  return new Promise(function (resolve, reject) {
    // Initialize the database and start the server
    db.sync({ alter: true, force: process.env.NODE_ENV !== 'production' }).then(async () => {
      if (process.env.NODE_ENV !== 'production') await seedDatabase()
      console.log(`Client requests will be redirected to port ${process.env.FRONT_PORT}`);
      //if (process.env.NODE_ENV === 'development') {
        https.createServer({
          key: privateKey,
          cert: certificate
        }, app).listen(process.env.BACK_PORT, () => {
          console.log(`💾 Server listening on port ${process.env.BACK_PORT}`)
          resolve(app);
        });
      /*} else {
        app.listen(process.env.BACK_PORT, () => {
          console.log(`✅ Production server listening on port ${process.env.BACK_PORT}`);
          resolve(app);
        })
      }*/
    }).catch((err) => {
      console.error("❌ Error while creating the database");
      console.error(err);
      reject(err);
    })
  })
}

exports.run();
