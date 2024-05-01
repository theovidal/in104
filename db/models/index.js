const {Sequelize} = require("sequelize");
const sequelize = require("../index.js");

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// importing ze modèles
db.Users = require("./users.js")(sequelize, Sequelize);
db.Tokens = require("./tokens.js")(sequelize, Sequelize);

db.Courses = require("./courses.js")(sequelize, Sequelize);
db.Lectures = require("./lectures.js")(sequelize, Sequelize);
db.Presences = require("./presence.js")(sequelize, Sequelize);

// creacheune of ze liens betweens la data

// à chaque utilisateurs, plusieurs tickets
db.Users.hasMany(db.Tokens);
db.Tokens.belongsTo(db.Users);

// à chaque cours, un unique prof
db.Users.hasMany(db.Courses, {as: "professor", foreignKey: "professorId"});
db.Courses.belongsTo(db.Users, {as: "professor", foreignKey: "professorId"});

// à chaque cours, plusieurs "instances"
db.Courses.hasMany(db.Lectures);
db.Lectures.belongsTo(db.Courses);

// à chaque cours, une liste d'élèves
db.Courses.belongsToMany(db.Users, {through: "Attendances"});
db.Users.belongsToMany(db.Courses, {through: "Attendances"});

// à chaque instance de cours, pleins d'élèves + s'ils sont là ou pas
db.Lectures.belongsToMany(db.Users, {through: db.Presences});
db.Users.belongsToMany(db.Lectures, {through: db.Presences});

module.exports = db;