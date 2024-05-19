// Action for the pupil of scanning a code, which contains the code of the current lecture

const {read_lecture, lectures} = require('../core/lectures')
const lectures_fun = require('../controllers/lectures');
const users_fun = require('../controllers/users');
const courses_fun = require('../controllers/courses');


module.exports = function createPresence(req, res) {
    if (res.locals.user.role === 'eleve') {

        //Verifications

        qrcode = req.query.code;
        const lecture_id = read_lecture(qr_code);

        if (lecture_id === undefined) {
            res.status(400).json({
                error: 'Séance non précisée'
            })
        }

        const lecture = lectures_fun.getById(lecture_id);
        if (lecture === null) {
            res.status(400).json({
                error: 'Séance inexistante'
            })
        }

        const user = users_fun.getByEmail(res.locals.users.email);
        if (user === null) {
            res.status(400).json({
                error: 'Utilisateur inexistant'
            })
        }

        const course = courses_fun.getById(lecture.courseId);


        const date_requete = new Date();
        const date_debut = lecture.date;
        const date_fin = lecture.date;
        date_fin.setTime(date_fin.getTime() + 3_600_000);

        if (date_debut > date_requete || date_fin < date_requete) {
            res.status(400).json({
                error: 'Horaire incompatible'
            })
        }
        //ce sera beginDate et endDate dès que Arnaud l'aura fait

        const liste_eleves = courses_fun.getAttendantsById(course.id);
        if (liste_eleves(user) === undefined) {
            res.status(400).json({
                error: 'Eleve et cours incompatibles'
            })
        }


        //On met l'élève présent

        lectures_fun.updatePresence(lecture_id, user.id, true);

    } else {
<<<<<<< HEAD
    res.status(403).json({
        error: 'Erreur dans la génération du code'
    })
    }

=======
        res.status(403).json({
            error: 'Erreur dans la génération du code'
        })
    }
>>>>>>> 86ab7369644970fb0a86f5c872d6c3a74d61b15c
}