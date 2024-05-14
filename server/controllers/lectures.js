const db = require("../../db/models");
const courses = require("./courses");

/**
 * 
 * @param {Date} beginDatetime Une date (ex: new Date())
 * @param {float} durationInMinutes La durée du cour (ex: 120 pour 2h)
 * @param {int} courseId l'identifiant du cours
 * @returns Promise<Objet>
 */
exports.create = (beginDatetime, durationInMinutes, courseId) => {
	return new Promise( async(resolve, reject) => {
		try {
			// création de la "lecture" (cours, date)
			const endDatetime = new Date(beginDatetime.getTime() + 60000 * durationInMinutes);

			const newLecture = await db.Lectures.create({
				beginDate: beginDatetime.toISOString(),
				endDate: endDatetime.toISOString(),
				courseId: courseId
			})

			// récupération des élèves
			const attendants = await courses.getAttendantsById(courseId);

			// ajout de chaque élève à la table des présences
			for(let attendant of attendants) {
				await db.Presences.create({
					userId: attendant.id,
					isPresent: false,
					lectureId: newLecture.dataValues.id
				});
			}

			// on renvoie l'objet "presence"
			resolve(newLecture.dataValues);
		} catch (error) {
			reject(error)
		}
	});
}

exports.updatePresence = (lectureId, userId, isPresent) => {
	return new Promise((resolve, reject) => {

	});
}

exports.isUserPresent = (lectureId, userId) => {
	return new Promise((resolve, reject) => {

	});
}

exports.getPresences = (lectureId) => {
	return new Promise((resolve, reject) => {
		db.Users.findAll({
			include: {model: db.Lectures, where: {id: lectureId}}
		}).then( vals => {
			dataValues = vals.map( value => value.dataValues );
			resolve(dataValues);
		}).catch( reject );
	});
}

exports.getCourseLectures = (courseId) => {

}

exports.getById = (lectureId) => {

}