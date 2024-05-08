const db = require("../../db/models");
const {Op} = require("sequelize");
const crypto = require("crypto")

const generateToken = (userId) => {
	return crypto.randomBytes(30).toString("hex") + (Date.now().toString()) + crypto.createHmac("md5", "k8bb;àçéjirIHGYé_7").update(String(userId)).digest("hex")
}

/**
 * créer un jeton d'identification pour userId qui expire le expireAt
 * 
 * @param {*} userId entier renvoyé par des fonctions comme "user.getByEmail"
 * @param {*} token une chaine de caractère quelconque
 * @param {*} expireAt une date sous format standard ISO, par exemple: (new Date()).toISOString()
 */
exports.create = (userId, expireAt) => {
	return new Promise((resolve, reject) => {
		const token = generateToken();
		db.Tokens.create({userId, token, expireAt})
			.then( token => resolve(token.dataValues))
			.catch( err => reject(err) );
	});
}

/**
 * Vérifie que [token] est bien associé à [userId] et n'a pas expiré
 * @param {string} token 
 * @returns {Promise<any>} promesse vers un objet user (/!\ cet objet contient le haché de l'utilisateur )
 */
exports.test = (token) => {
	return new Promise((resolve, reject) => {
		db.Tokens.findAll({
			where: {
				token,
				expireAt: { [Op.gte]: (new Date()) }
			},
			include: db.Users
		}).then( values => {
			const dataValues = values.map( val => val.dataValues);
			if(dataValues.length != 1) {
				resolve(null);
			} else {
				resolve(dataValues[0].user)
			}
		}).catch( err => reject(err) );
	});
}

/**
 * supprimer tout les jetons de la base de donnée qui ont expirés
 * @returns {Promise<>}
 */
exports.removeExpiredTokens = () => {
	return new Promise( (resolve, reject) => {
		db.Tokens.destroy({
			where: {
				expireAt: { [Op.lt]: (new Date()) }
			}
		}).then( _ => {
			resolve()
		}).catch( err => reject(err) )
	})
}

/**
 * supprimer le token [token], ne fait rien s'il n'existe pas
 * @param {*} token 
 */
exports.remove = (token) => {
	return new Promise( (resolve, reject) => {
		db.Tokens.destroy({
			where: {
				token
			}
		}).then( _ => {
			resolve()
		}).catch( err => reject(err) )
	})
}