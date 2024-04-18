const {Sequelize} = require("sequelize");
const sequelize = require("../config/db.js");

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

const Users = require("./users.js");
db.Users = Users(sequelize, Sequelize);

const Tokens = require("./tokens.js");
db.Tokens = Tokens(sequelize, Sequelize);

db.Tokens.hasOne(db.Users);

module.exports = db;