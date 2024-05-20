const db = require("../../db/models");
const bcrypt = require("bcrypt");

/**
 * 
 * @param email User email
 * @returns A promise then the user object or null
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
 * Creates a user, the password is hashed automatically
 * @param {firstname, lastname, email, role, password} user 
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
 * Makes sure the connexion data is correct, by email, [password] should not be hashed as it will be in this function
 * @param {string} email 
 * @param {string} password 
 */
exports.testCredentialsByEmail = (email, password) => {

	return new Promise((resolve, reject) => {
		if( email === undefined || password === undefined)  {
			reject("Arguments manquants");
		}

		// Recovering the user object from the database
		exports.getByEmail(email).then( user => {
			if(user == null ) {
				reject("Aucun utilisateur associé à cet email");
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
 * Makes sure the connexion data is correct, by email, [password] should not be hashed as it will be in this function
 * @param {int} id 
 * @param {string} password 
 */
exports.testCredentialsById = (id, password) => {

	return new Promise((resolve, reject) => {
		if( id === undefined || password === undefined)  {
			reject("arguments manquants");
		}

		// Recovering the user object from the database
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
 * Updates the user data associated to email,
 * @param {string} email 
 * @param {{firstname, lastname, email, role, password}} newUser No update if one of the fields equals undefined
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
 * Updates the user data associated to id,
 * @param {*} id 
 * @param {{firstname, lastname, email, role, password}} newUser No update if one of the fields equals undefined
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