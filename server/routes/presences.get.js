//Donne les présences/absences d'un ou des élève(s), selon le cas d'utilisation
//query - isPresent : true/false/undefined, userId : userId/undefined, lectureId : lectureId/undefined
const presences = require("../controllers/presences");
const users = require('../controllers/users');

module.exports = async function getPresences(req, res) { 
    const data = (await presences.getPresences(req.body.lectureId, req.body.userId, req.body.isPresent));
    for (const i in data) {
        data[i].user = await users.getById(data[i].userId);
      }
      return res.json({
        data
      })
    }