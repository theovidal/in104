// Manually set a pupil as absent ; can be used if the teacher notices that the code has been scanned with an account that doesn't correspond
// to a pupil in the room.

const lectures_fun = require('../controllers/lectures');
const users_fun = require('../controllers/users');
const courses_fun = require('../controllers/courses');

module.exports = function deletePresence(req, res) {
    if (res.locals.user.role === "professeur") {
        
        //Verif que user in lecture du prof, à la bonne heure, et présent
        const eleve = users_fun.getById(req.query.eleveId);
        const professeur = users_fun.getByEmail(res.locals.users.email);
        const lecture = lectures_fun.getById(req.query.lectureId);
        const course = courses_fun.getById(lecture.courseId);

        if (course.teacherId != professeur.id) {
            res.status(403).json({
                error: 'Acces interdit'
            })
        }
        
        if (lectures_fun.isUserPresent(lecture.id, eleve.id) != true) {
            res.status(400).json({
                error: 'Opération impossible'
            })
        }

    }else {
        res.status(403).json({
            error: 'Erreur dans la génération du code'
        })
    }
}