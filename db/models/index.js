const {Sequelize} = require("sequelize");
const sequelize = require("../index.js");

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// importing ze modèles
db.Users = require("./users.js")(sequelize, Sequelize);

db.Tokens = require("./tokens.js")(sequelize, Sequelize);
db.Attendance = require("./attendance.js")(sequelize, Sequelize);
db.Courses = require("./courses.js")(sequelize, Sequelize);
db.Lectures = require("./lectures.js")(sequelize, Sequelize);
db.Presences = require("./presence.js")(sequelize, Sequelize);

// creacheune of ze liens betweens la data
db.Users.hasMany(db.Tokens);
db.Tokens.belongsTo(db.Users);

module.exports = db;