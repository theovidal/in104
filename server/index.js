const express = require('express');
const app = express();

// Importing all the values stored in the .env
require('dotenv').config();

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

// Error handling middleware, to return formatted errors to the user
const errorHandler = require('./middlewares/errors');
app.use(errorHandler);

// Helper to register every route located in the /routes directory
const registerRoutes = require('./core/registerRoutes');
registerRoutes(app);

const db = require("./config/db")

// initializing ze base de données
db.sync({force: true}).then(() => {
  app.listen(process.env.PORT, () => {
    console.log(`✅ Listening on port ${process.env.PORT}`);
  })
}).catch( () => {
  console.error("🤡🤡🤡🤡")
})