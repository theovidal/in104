const { Sequelize } = require("sequelize");

const [db_type, db_path] = (()=> {
	if( process.env.TEST_DB == "yes" ) {
		return ["sqlite", "testdb.sqlite"]
	} else {
		return ["sqlite", "proddb.sqlite"]
	}
})()

const sequelize = new Sequelize( {
	dialect: db_type,
	storage: db_path,
	logging: false
});

console.log(`BDD: type ${db_type} storage ${db_path}`)

sequelize
	.authenticate()
	.then(() => {
		console.log("BDD: connectée");
	})
	.catch((err) => {
		console.log(err);
	});

module.exports = sequelize;