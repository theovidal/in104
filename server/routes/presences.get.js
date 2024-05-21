//Donne les présences/absences d'un ou des élève(s), selon le cas d'utilisation
//query - isPresent : true/false/undefined, userId : userId/undefined, lectureId : lectureId/undefined
const presences = require("../controllers/presences");
const users = require('../controllers/users');

// Get all the presences, and then filter on the user, the lecture and the presence or not
// Pupils can only access THEIR presences
module.exports = async function getPresences(req, res) {
    if (res.locals.user.role === 'eleve' && req.query.userId != res.locals.user.id) return res.status(403).json({
      error: "Vous ne pouvez accéder qu'à vos propres présences"
    })

    const data = (await presences.getPresences(req.query.lectureId, req.query.userId, req.query.isPresent));
    data.forEach(pupil => delete pupil.passwordHash);
    return res.json({
      data
    })
  }