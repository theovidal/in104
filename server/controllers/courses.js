const db = require("../../db/models");

/**
 * 
 * @param {int} teacherId the professor ID, returned by users.get* or users.create(...)
 * @param {string} name Course name
 * @returns A promise which contains the course's JSON data
 */
exports.create = (teacherId, name) => {
	return new Promise((resolve, reject) => {
		db.Courses.create({
			name,
			teacherId
		})
			.then( course => resolve(course.dataValues) )
			.catch( err => reject(err) )
	})
}

/**
 * Get a course by its name (names are unique)
 * @param {string} name Course name, can be recovered with courses.create(...) or courses.get*()
 * @returns a promise which contains the course's data, rejected if there is a sequelize error
 */
exports.getByName = (name) => {
	return new Promise((resolve, reject) => {
		db.Courses.findOne({where: {name}})
			.then( course => resolve( course !== null ? course.dataValues: null))
			.catch( err => reject(err) );
	});
}

/**
 * Get a course by its ID (IDs are unique)
 * @param {int} id Course ID, can be recovered with courses.create(...) or courses.get*()
 * @returns a promise which contains the course's data, rejected if there is a sequelize error
 */
exports.getById = (id) => {
	return new Promise((resolve, reject) => {
		db.Courses.findOne({where: {id}})
			.then( course => resolve( course !== null ? course.dataValues: null))
			.catch( err => reject(err) );
	});
}

/**
 * Deletes the courses associated to courseId
 * @param {int} courseId 
 * @returns a promise
 */
exports.removeById = (courseId) => {
	return new Promise((resolve, reject) => {
		db.Courses.destroy({where: {id: courseId}}).then( resolve).catch( reject );
	});
}

/**
 * Deletes the course associated to courseName	
 * @param {string} courseName 
 * @returns a promise
 */
exports.removeByName = (courseName) => {
	return new Promise((resolve, reject) => {
		db.Courses.destroy({where: {name: courseName}}).then( resolve).catch( reject );
	});
}

/**
 * Updates the courses associated to courseId
 * @param {int} courseId  
 * @param {{name, teacherId}} newCourse If one of the fields is equal to undefined, then there is no update
 */
exports.updateById = (courseId, newCourse) => {
	newCourse = Object.fromEntries(Object.entries(newCourse).filter(([key, val]) => {
		return val !== undefined;
	}));

	return new Promise( async(resolve, reject) => {
		try {
			const course = await db.Courses.findOne({where:{id: courseId}});
			const updatedCourse = await course.set(newCourse);
			await updatedCourse.save();
			resolve( updatedCourse !== null ? updatedCourse.dataValues: null );
		}
		catch(err) {
			reject(err);
		}
	});
}

/**
 * Updates the courses associated to courseName
 * @param {string} courseName  
 * @param {{name, teacherId}} newCourse If one of the fields is equal to undefined, then there is no update
 */
exports.updateByName = (courseName, newCourse) => {
	newCourse = Object.fromEntries(Object.entries(newCourse).filter(([key, val]) => {
		return val !== undefined;
	}));

	return new Promise( async(resolve, reject) => {
		try {
			const course = await db.Courses.findOne({where:{name: courseName}});
			const updatedCourse = await course.set(newCourse)
			await updatedCourse.save()
			resolve( updatedCourse !== null ? updatedCourse.dataValues: null )
		}
		catch(err) {
			reject(err);
		}
	});
}

/**
 * Adds the pupil with Id attendantId to the course with Id courseId
 * @param {int} courseId 
 * @param {int} attendantId 
 * @returns a promise which returns the JSON data of the association made
 */
exports.addAttendantById = (courseId, attendantId) => {
	return new Promise((resolve, reject) => {
		db.Attendances.create({
			userId: attendantId,
			courseId: courseId
		}).then( attendance => {
			resolve( attendance !== null ? attendance.dataValues: null);
		}).catch( reject );
	});
}

/**
 * Gets the pupils associated to course with id courseId
 * @param {int} courseId 
 * @returns Promise<[]> an array containing user data
 */
exports.getAttendantsById = (courseId) => {
	return new Promise((resolve, reject) => {
		db.Users.findAll({
			include: {model: db.Courses, where: {id: courseId}}
		}).then( vals => {
			dataValues = vals.map( value => value.dataValues );
			resolve(dataValues);
		}).catch( reject );
	});
}

/**
 * Gets the pupils associated to course with name courseName
 * @param {string} courseName
 * @returns Promise<[]> an array containing user data
 */
exports.getAttendantsByName= (courseName) => {
	return new Promise((resolve, reject) => {
		db.Users.findAll({
			include: {model: db.Courses, where: {name: courseName}}
		}).then( vals => {
			dataValues = vals.map( value => value.dataValues );
			resolve(dataValues);
		}).catch( reject );
	});
}

/**
 * Gets the lectures associated to course with id courseId
 * @param {int} courseId 
 * @returns Promise<Object[]>
 */
exports.getCourseLectures = (courseId) => {
	return new Promise((resolve, reject) => {
		db.Lectures.findAll({
			where: {courseId}
		}).then( vals => {
			const dataValues = vals.map( value => value.dataValues );
			resolve(dataValues);
		}).catch( reject );
	});
}

/**
 * Gets the lectures associated to teacher with Id teacherId
 * @param {int} teacherId
 * @returns Promise<Object[]>
 */
exports.getByTeacherId = (teacherId) => {
	return new Promise((resolve, reject) => {
		db.Courses.findAll({
			where: {teacherId}
		}).then(vals => {
			const dataValues = vals.map( value => value.dataValues );
			resolve(dataValues);
		}).catch( reject );
	})
}
