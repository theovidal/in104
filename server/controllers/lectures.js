const db = require("../../db/models");
const courses = require("./courses");

/**
 * 
 * @param {Date} beginDatetime A date (ex: new Date())
 * @param {float} durationInMinutes Lecture duration (ex: 120 pour 2h)
 * @param {int} courseId Course Id
 * @returns Promise<Objet>
 */
exports.create = (beginDatetime, durationInMinutes, courseId) => {
	return new Promise( async(resolve, reject) => {
		try {
			// lecture creation (course, date)
			const endDatetime = new Date(beginDatetime.getTime() + 60000 * durationInMinutes);

			const newLecture = await db.Lectures.create({
				beginDate: beginDatetime.toISOString(),
				endDate: endDatetime.toISOString(),
				courseId: courseId
			})

			// pupils recovering
			const attendants = await courses.getAttendantsById(courseId);

			// each pupil is added to the presences table
			for(let attendant of attendants) {
				await db.Presences.create({
					userId: attendant.id,
					isPresent: false,
					lectureId: newLecture.dataValues.id
				});
			}

			// presence is returned
			resolve(newLecture.dataValues);
		} catch (error) {
			reject(error)
		}
	});
}

/**
 * Updates a pupil's presence in a lecture
 * @param {int} lectureId
 * @param {int} userId
 * @param {boolean} isPresent 
 * @returns Promise<>
 */
exports.updatePresence = (lectureId, userId, isPresent) => {
	return new Promise( async(resolve, reject) => {
		try {
			const presence = await db.Presences.findOne({
				where: {
					userId: userId,
					lectureId: lectureId
				}
			});

			await presence.set({
				isPresent: isPresent
			});

			await presence.save();

			resolve();
		} catch( error ) {
			reject(error);
		}
	});
}

/**
 * 
 * @param {int} lectureId 
 * @param {int} userId 
 * @returns Promise<bool>
 */
exports.isUserPresent = (lectureId, userId) => {
	return new Promise( async(resolve, reject) => {
		try {
			const presence = await db.Presences.findOne({
				where: {
					userId: userId,
					lectureId: lectureId
				}
			});

			resolve(presence.dataValues.isPresent);
		} catch( error ) {
			reject(error);
		}
	});
}

/**
 * Gets the presence list of the users present to the lecture with id lectureId
 * @param {int} lectureId 
 * @returns Promise<Object[]>
 */
exports.getPresences = (lectureId) => {
	return new Promise((resolve, reject) => {
		db.Users.findAll({
			include: {model: db.Lectures, where: {id: lectureId}}
		}).then( vals => {
			let dataValues = vals.map(value => value.dataValues)
			resolve(dataValues);
		}).catch( reject );
	});
}

/**
 * Self explanatory
 * @param {int} lectureId 
 * @returns {Promise<>}
 */
exports.getById = (lectureId) => {
	return new Promise((resolve, reject) => {
		db.Lectures.findByPk(lectureId)
			.then( value => resolve(value === null ? null : value.dataValues))
			.catch( reject );
	});
}