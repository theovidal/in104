const { DataTypes } = require("sequelize");

const Tokens = (sequelize, Sequelize) => {
	const Tokens = sequelize.define("tokens", {
		token: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		expireAt: {
			type: DataTypes.DATE,
			allowNull: false
		}
	});
	return Tokens;
}

module.exports = Tokens;