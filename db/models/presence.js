const {DataTypes} = require("sequelize");

const Presence = (sequelize, Sequelize) => {
	const Presence = sequelize.define("presence", {
		isPresent: {
			type: DataTypes.BOOL,
			allowNull: false
		}
	});
	return Presence;
}

module.exports = Presence;