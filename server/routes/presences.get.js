// Get all the presences, and then filter on the user, the lecture and the presence or not
// Pupils can only access THEIR presences
const presences = require("../controllers/presences");
const users = require('../controllers/users');

module.exports = async function getPresences(req, res) {
    if (res.locals.user.role === 'eleve' && req.query.userId != res.locals.user.id) return res.status(403).json({
      error: "Vous ne pouvez accéder qu'à vos propres présences"
    })

    let data = (await presences.getPresences(req.query.lectureId, req.query.userId, req.query.isPresent));
    data.forEach(pupil => delete pupil.passwordHash);
    if (res.locals.user.role === 'professeur') {
        data = data.filter((lecture) => lecture.teacherId === res.locals.user.id);
    }
    return res.json({
      data
    })
  }