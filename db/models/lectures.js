const {DataTypes} = require("sequelize");

const Lectures = (sequelize, Sequelize) => {
	const Lectures = sequelize.define("lectures", {
		date: {
			type: DataTypes.DATE,
			allowNull: false
		}
	});
	return Lectures;
}

module.exports = Lectures;