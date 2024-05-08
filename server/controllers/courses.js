const db = require("../../db/models");

/**
 * 
 * @param {int} teacherId l'identifiant du professeur, est renvoyé par users.get* ou bien users.create(...)
 * @param {string} name Le nom du cours
 * @returns une promesse qui contient les données JSON du cours
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
 * Récupère un cours depuis son nom (les noms sont uniques)
 * @param {string} name Le nom du cours récupérable par courses.create(...) ou courses.get*()
 * @returns une promesse qui contient les données du cours ou bien null, en cas d'erreur sequelize, la promesse est rejetée
 */
exports.getByName = (name) => {
	return new Promise((resolve, reject) => {
		db.Courses.findOne({where: {name}})
			.then( course => resolve( course !== null ? course.dataValues: null))
			.catch( err => reject(err) );
	});
}

/**
 * Récupère un cours depuis son ID (les ID sont uniques)
 * @param {int} id L'identifiant du cours récupérable par courses.create(...) / courses.get*()
 * @returns une promesse qui contient les données du cours ou bien null, en cas d'érreure sequelize, la promesse est rejetée
 */
exports.getById = (id) => {
	return new Promise((resolve, reject) => {
		db.Courses.findOne({where: {id}})
			.then( course => resolve( course !== null ? course.dataValues: null))
			.catch( err => reject(err) );
	});
}

/**
 * supprime le cours associé à [courseId]
 * @param {int} courseId 
 * @returns une promesse qui se résout en cas de succès et se rejète en cas d'érreure
 */
exports.removeById = (courseId) => {
	return new Promise((resolve, reject) => {
		db.Courses.destroy({where: {id: courseId}}).then( resolve).catch( reject );
	});
}

/**
 * Supprime le cours associé à name	
 * @param {string} courseName 
 * @returns une promesse qui se résout en cas de succès et se rejète en cas d'érreure
 */
exports.removeByName = (courseName) => {
	return new Promise((resolve, reject) => {
		db.Courses.destroy({where: {name: courseName}}).then( resolve).catch( reject );
	});
}

/**
 * met à jour les données du cours associé à [id],
 * @param {int} courseId  
 * @param {{name, teacherId}} newCourse si un des champs est égal à [undefined] alors sa valeur n'est pas mise à jour
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
 * met à jour les données du cours associé à [courseName],
 * @param {string} courseName  
 * @param {{name, teacherId}} newCourse si un des champs est égal à [undefined] alors sa valeur n'est pas mise à jour
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
 * Ajoute un élève [attendantId] au cours [courseId]
 * @param {int} courseId 
 * @param {int} attendantId 
 * @returns promesse qui renvoie les données JSON de l'association créer, ou est rejetée en cas d'érreure sequelize
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
 * récupère les élèves associés au cours [courseId]
 * @param {int} courseId identifiant du cours (renvoyé par courses.get*())
 * @returns Promise<[]> une liste avec des données d'utilisateurs
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
 * récupère les élèves associés au cours [courseName]
 * @param {string} courseName identifiant du cours (renvoyé par courses.get*())
 * @returns Promise<[]> une liste avec des données d'utilisateurs
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