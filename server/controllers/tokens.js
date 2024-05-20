const db = require("../../db/models");
const {Op} = require("sequelize");
const jwt = require('jsonwebtoken')

const generateToken = (id, email, role) => {
	return jwt.sign({
		id, email, role,
	}, process.env.TOKEN_SECRET, { expiresIn: `${process.env.TOKEN_EXPIRATION}s` });}

/**
 * créer un jeton d'identification pour userId qui expire le expireAt
 * 
 * @param {*} id entier renvoyé par des fonctions comme "user.getByEmail"
 * @param {*} email l'adresse email de l'utilisateur
 * @param {*} role le rôle de l'utilisateur (eleve | professeur | admin)
 */
exports.create = (id, email, role) => {
	return new Promise((resolve, reject) => {
		const token = generateToken();
		const expiration = new Date();
		expiration.setSeconds(expiration.getSeconds() + parseInt(process.env.TOKEN_EXPIRATION));
		db.Tokens.create({userId, token, expiration})
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