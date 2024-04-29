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

/**
 * 
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