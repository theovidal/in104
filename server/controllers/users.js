const db = require("../../db/models");
const bcrypt = require("bcrypt");

/**
 * 
 * @param email l'email de l'utilisateur
 * @returns une promesse puis l'objet utilisateur ou null
 */
exports.getByEmail = (email) => {
	return new Promise((resolve, reject) => {
		db.Users.findOne({where: {email: email}}).then( val => {
			resolve(val !== null ? val.dataValues: null);
		})
	})
}

exports.getById = (id) => {
	return new Promise((resolve, reject) => {
		db.Users.findByPk(id).then( val => {
			resolve(val !== null ? val.dataValues: null);
		});
	});
}

/**
 * créer un utilisateur, le mot de passe [password] sera automatiquement haché
 * @param {firstname, lastname, email, role, password} l'utilisateur 
 */
exports.create = ({firstname, lastname, email, role, password}) => {
	return new Promise((resolve, reject) => {
		// cf. https://www.npmjs.com/package/bcrypt
		bcrypt.hash(password, 10, async(err, hash) => {
			if(err !== undefined) {
				console.error("Impossible de hacher le mdp de ", firstname, lastname);
				reject(err);
			}
			
			db.Users.create({
				firstname,
				lastname,
				email,
				role,
				passwordHash: hash
			})
				.then( user => resolve(user.dataValues))
				.catch( err => reject(err) );
		});
	})
}

/**
 * vérifie que les données de connexion sont les bonnes, [password] ne doit pas être haché car il le sera dans cette fonction
 * @param {string} email 
 * @param {string} password 
 */
exports.testCredentialsByEmail = (email, password) => {
	// j'ai eu un problème avec ça donc au fur et à mesure, j'ajoute des conditions
	return new Promise((resolve, reject) => {
		if( email === undefined || password === undefined)  {
			reject("arguments manquants");
		}

		// récupération de l'objet "utilisateur" dans la bdd
		exports.getByEmail(email).then( user => {
			if(user == null ) {
				reject("no user associated with email");
				return;
			}

			bcrypt.compare(password, user.passwordHash, (err, same) => {
				if(err !== undefined) {
					reject(err);
				}
				resolve(same);
			})
		}).catch( err => reject(err) );
	})
}

/**
 * vérifie que les données de connexion sont les bonnes, [password] ne doit pas être haché car il le sera dans cette fonction
 * @param {int} id 
 * @param {string} password 
 */
exports.testCredentialsById = (id, password) => {

	// j'ai eu un problème avec ça donc au fur et à mesure, j'ajoute des conditions
	return new Promise((resolve, reject) => {
		if( id === undefined || password === undefined)  {
			reject("arguments manquants");
		}

		// récupération de l'objet "utilisateur" dans la bdd
		exports.getById(id).then( user => {
			bcrypt.compare(password, user.passwordHash, (err, same) => {
				if(err !== undefined) {
					reject(err);
				}
				resolve(same);
			});
		}).catch( err => reject(err) );
	})
}

exports.removeByEmail = (email) => {
	return new Promise((resolve, reject) => {
		db.Users.destroy({where: {email: email}}).then( resolve ).catch( reject );
	});
}

exports.removeById = (id) => {
	return new Promise((resolve, reject) => {
		db.Users.destroy({where: {id: id}}).then( resolve ).catch( reject );
	});
}

/**
 * met à jour les données de l'utilisateur associé à [email],
 * @param {string} email 
 * @param {{firstname, lastname, email, role, password}} newUser si un des champs est égal à [undefined] alors sa valeur n'est pas mise à jour
 */
exports.updateByEmail = (email, newUser) => {
	// retire les clefs non définies de l'objet newUser
	newUser = Object.fromEntries(Object.entries(newUser).filter(([key, val]) => {
		return val !== undefined;
	}));

	return new Promise( async(resolve, reject) => {
		try {
			const user = await db.Users.findOne({where:{email: email}});
			const updatedUser = await user.set(newUser);
			await updatedUser.save();
			resolve( updatedUser !== null ? updatedUser.dataValues: null );
		}
		catch(err) {
			reject(err);
		}
	})
}

/**
 * met à jour les données de l'utilisateur associé à [id],
 * @param {*} id 
 * @param {{firstname, lastname, email, role, password}} newUser si un des champs est égal à [undefined] alors sa valeur n'est pas mise à jour
 */
exports.updateById = (id, newUser) => {
	// retire les clefs non définies de l'objet newUser
	newUser = Object.fromEntries(Object.entries(newUser).filter(([key, val]) => {
		return val !== undefined;
	}));

	return new Promise( async(resolve, reject) => {
		try {
			const user = await db.Users.findOne({where:{id: id}});
			const updatedUser = await user.set(newUser);
			await updatedUser.save();
			resolve( updatedUser !== null ? updatedUser.dataValues: null );
		}
		catch(err) {
			reject(err);
		}
	})
}