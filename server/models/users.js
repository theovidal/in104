const {DataTypes} = require("sequelize");

const Users = (sequelize, Sequelize) => {
	const Users = sequelize.define("users", {
		firstname: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		lastname: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		email: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		password_hash: {
			type: DataTypes.STRING,
			allowNull: false,
		}
	});
	return Users;
}

module.exports = Users;