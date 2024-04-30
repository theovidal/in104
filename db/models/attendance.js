const {DataTypes} = require("sequelize");

const Attendance = (sequelize, Sequelize) => {
	const Attendance = sequelize.define("attendance", {
		date: {
			type: DataTypes.DATE,
			allowNull: false
		}
	});
	return Attendance;
}

module.exports = Attendance;