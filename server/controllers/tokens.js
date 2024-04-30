const db = require("../../db/models");
const {Op} = require("sequelize")

/**
 * créer un jeton d'identification pour userId qui expire le expireAt
 * 
 * @param {*} userId entier renvoyé par des fonctions comme "user.getByEmail"
 * @param {*} token une chaine de caractère quelconque
 * @param {*} expireAt une date sous format standard ISO, par exemple: (new Date()).toISOString()
 */
exports.create = (userId, token, expireAt) => {
	return new Promise((resolve, reject) => {
		db.Tokens.create({userId, token, expireAt})
			.then( token => resolve(token.dataValues))
			.catch( err => reject(err) );
	});
}

/**
 * Vérifie que [token] est bien associé à [userId] et n'a pas expiré
 * @param {int} userId 
 * @param {string} token 
 * @returns {Promise<bool>} un booléen
 */
exports.test = (userId, token) => {
	return new Promise((resolve, reject) => {
		db.Tokens.findAll({
			where: {
				userId,
				token,
				expireAt: { [Op.gte]: (new Date()) }
			}
		}).then( values => {
			const dataValues = values.map( val => val.dataValues);
			resolve( dataValues.length != 0 )
		}).catch( err => reject(err) )
	});
}

/**
 * supprimer tout les jetons de [userId] qui ont expirés
 * @param {int} userId 
 * @returns {Promise<>}
 */
exports.removeExpiredTokens = (userId) => {
	return new Promise( (resolve, reject) => {
		db.Tokens.destroy({
			where: {
				userId,
				expireAt: { [Op.lt]: (new Date()) }
			}
		}).then( _ => {
			resolve()
		}).catch( err => reject(err) )
	})
}

/**
 * supprimer le token [token] associé à [userId], ne fait rien s'il n'existe pas
 * @param {*} userId 
 * @param {*} token 
 */
exports.remove = (userId, token) => {
	return new Promise( (resolve, reject) => {
		db.Tokens.destroy({
			where: {
				userId,
				token
			}
		}).then( _ => {
			resolve()
		}).catch( err => reject(err) )
	})
}