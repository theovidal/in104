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
		passwordHash: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		role: {
			type: DataTypes.STRING,
			allowNull: false
		}
	});
	return Users;
}

module.exports = Users;