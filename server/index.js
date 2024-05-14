const express = require('express');
const cors = require('cors');
const app = express();
const user = require('./controllers/users');

// Importing all the values stored in the .env
require('dotenv').config();

// CORS (Cross-Origin resource sharing) policy middleware, to enable the client to interact with the API
// https://developer.mozilla.org/fr/docs/Web/HTTP/CORS
app.use(cors())
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

// Error handling middleware, to return formatted errors to the user
const errorHandler = require('./middlewares/errors');
app.use(errorHandler);

const db = require("../db");

// Initialize the database and start the server
db.sync({alter: true}).then(() => {
  user.create({
    firstname: "Théo",
    lastname: "Vidal",
    email: "theo.vidal@ensta-paris.fr",
    role: "eleve",
    password: "abcabc"
  })
  app.listen(process.env.PORT, () => {
    console.log(`✅ Listening on port ${process.env.PORT}`);
  })
}).catch( () => {
  console.error("❌ Error while creating the database")
})