const db = require("../models");
const bcrypt = require("bcrypt");

/**
 * 
 * @param email l'email de l'utilisateur
 * @returns une promesse puis l'objet utilisateur ou null
 */
exports.getByEmail = (email) => {
	return new Promise((resolve, reject) => {
		db.Users.findOne({where: {email: email}}).then( val => {
			if(val !== null) {
				resolve(val.dataValues)
			}
			resolve(null)
		})
	})
}

exports.getById = (id) => {

}

/**
 * créer un utilisateur, le mot de passe [password] sera automatiquement haché
 * @param {firstname, lastname, email, role, password} l'utilisateur 
 */
exports.create = ({firstname, lastname, email, role, password}) => {
	// cf. https://www.npmjs.com/package/bcrypt
	bcrypt.hash(password, 10, async(err, hash) => {
		if(err !== undefined) {
			console.error("Impossible de hacher le mdp de ", firstname, lastname);
			return;
		}
		
		await db.Users.create({
			firstname,
			lastname,
			email,
			role,
			password_hash: hash
		});
	});
}

/**
 * vérifie que les données de connexion sont les bonnes, [password] ne doit pas être haché car il le sera dans cette fonction
 * @param {*} email 
 * @param {*} password 
 */
exports.testCredentials = (email, password) => {

}

exports.removeByEmail = (email) => {

}

/**
 * met à jour les données de l'utilisateur associé à [email],
 * @param {*} email 
 * @param {firstname, lastname, email, role, password} newUser si un des champs est égal à [undefined] alors sa valeure n'est pas mise à jour
 */
exports.updateByEmail = (email, newUser) => {

}

exports.removeById = (id) => {

}

/**
 * met à jour les données de l'utilisateur associé à [id],
 * @param {*} id 
 * @param {firstname, lastname, email, role, password} newUser si un des champs est égal à [undefined] alors sa valeure n'est pas mise à jour
 */
exports.updateById = (id, newUser) => {

}