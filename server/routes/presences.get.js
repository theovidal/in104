//Donne les présences/absences d'un ou des élève(s), selon le cas d'utilisation
//query - isPresent : true/false/undefined, userId : userId/undefined, lectureId : lectureId/undefined
const presences = require("../controllers/presences");
const users = require('../controllers/users');

module.exports = async function getPresences(req, res) { 
    const data = (await presences.getPresences(req.query.lectureId, req.query.userId, req.query.isPresent));
    data.forEach(pupil => delete pupil.passwordHash);
    return res.json({
      data
    })
  }