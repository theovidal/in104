const {Sequelize} = require("sequelize");
const sequelize = require("../index.js");

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// importing ze modèles
const Users = require("./users.js");
db.Users = Users(sequelize, Sequelize);

const Tokens = require("./tokens.js");
db.Tokens = Tokens(sequelize, Sequelize);

// creacheune of ze liens betweens la data
db.Tokens.hasOne(db.Users);

module.exports = db;