const {DataTypes} = require("sequelize");

const Lectures = (sequelize, Sequelize) => {
	const Lectures = sequelize.define("lectures", {
		beginDate: {
			type: DataTypes.DATE,
			allowNull: false
		},
		endDate: {
			type: DataTypes.DATE,
			allowNull: false
		}
	});
	return Lectures;
}

module.exports = Lectures;