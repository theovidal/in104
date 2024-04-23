/**
 * créer un jeton d'identification pour userId qui expire le expireAt
 * 
 * @param {*} userId entier renvoyé par des fonctions comme "user.getByEmail"
 * @param {*} token une chaine de caractère quelconque
 * @param {*} expireAt une date sous format standard ISO, par exemple: (new Date()).toISOString()
 */
exports.create = (userId, token, expireAt) => {

}

/**
 * Vérifie que [token] est bien associé à [userId] et le retire s'il est expiré
 * @param {*} userId 
 * @param {*} token 
 * @returns un booléen
 */
exports.test = (userId, token) => {

}

/**
 * supprimer le token [token] associé à [userId], ne fait rien s'il n'existe pas
 * @param {*} userId 
 * @param {*} token 
 */
exports.remove = (userId, token) => {

}