const { Sequelize } = require("sequelize");

const db_type = process.env.DB_TYPE;
const db_path = process.env.DB_TYPE === "sqlite" ? "database.sqlite": undefined;

const sequelize = new Sequelize( {
	dialect: db_type,
	storage: db_path,
	logging: false
});

console.log(`BDD: type ${process.env.DB_TYPE} storage ${db_path}`)

sequelize
	.authenticate()
	.then(() => {
		console.log("BDD: connectée");
	})
	.catch((err) => {
		console.log(err);
	});

module.exports = sequelize;