const db = require("../../db/models")

/**
 * Renvoie les présences de l'utilisateur userId, qui ont pour valeure value (ex: true pour récupérer la liste des séances ou il à été présent, false pour la liste des abscences)
 * @param {int} userId 
 * @param {boolean} value 
 * @returns {Promise<Object[]>}
 */
exports.getUserPresences = (userId, value) => {
	return new Promise((resolve, reject) => {
		db.Presences.findAll({
			where: {userId: userId, isPresent: value}
		}).then( values => {
			resolve(values.map(el => el.dataValues))
		}).catch( reject );
	})
}

/**
 * Renvoie toutes les présences de tout les élèves de toutes les séances
 * @returns {Promise<Object[]>}
 */
exports.getAllPresences = () => {
	return new Promise((resolve, reject) => {
		db.Presences.findAll()
			.then( values => {
				resolve(values.map(el => el.dataValues));
			})
			.catch( reject );
	})
}