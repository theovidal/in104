const { DataTypes } = require("sequelize");

const Courses = (sequelize, Sequelize) => {
	const Courses = sequelize.define("courses", {
		name: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: true
		}
	});
	return Courses;
}

module.exports = Courses;