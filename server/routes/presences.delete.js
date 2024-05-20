// Manually set a pupil as absent ; can be used if the teacher notices that the code has been scanned with an account that doesn't correspond
// to a pupil in the room.

const lectures_fun = require('../controllers/lectures');
const users_fun = require('../controllers/users');
const courses_fun = require('../controllers/courses');

module.exports = async function deletePresence(req, res) {
    if (res.locals.user.role === "professeur") {
        
        //Verif que user in lecture du prof et présent
        const eleve = await users_fun.getById(req.body.eleveId);
        const professeur = await users_fun.getByEmail(res.locals.users.email);
        const lecture = await lectures_fun.getById(req.body.lectureId);
        const course = await courses_fun.getById(lecture.courseId);

        if (course.teacherId != professeur.id) {
            return res.status(403).json({
                error: 'Acces interdit'
            })
        }
        
        if (!(lectures_fun.isUserPresent(lecture.id, eleve.id))) {
            return res.status(400).json({
                error: 'Opération impossible'
            })
        }

        await lectures_fun.updatePresence(lecture_id, user.id, false);

    }else {
        res.status(403).json({
            error: 'Erreur dans la génération du code'
        })
    }
}