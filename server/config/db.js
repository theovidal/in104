const { Sequelize } = require("sequelize");

const sequelize = new Sequelize( {
	dialect: "sqlite",
	storage: "./database.sqlite",
	logging: false
});

sequelize
	.authenticate()
	.then(() => {
		console.log("DATABASE CONNECTED");
	})
	.catch((err) => {
		console.log(err);
	});

module.exports = sequelize;