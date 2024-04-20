const { DataTypes } = require("sequelize");

const Tokens = (sequelize, Sequelize) => {
	const Tokens = sequelize.define("tokens", {
		token: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		expiration_date: {
			type: DataTypes.DATE,
			allowNull: false
		}
	});
	return Tokens;
}

module.exports = Tokens;