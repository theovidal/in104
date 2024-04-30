const {DataTypes} = require("sequelize");

const Presence = (sequelize, Sequelize) => {
	const Presence = sequelize.define("presence", {
		isPresent: {
			type: DataTypes.BOOLEAN,
			allowNull: false
		}
	});
	return Presence;
}

module.exports = Presence;