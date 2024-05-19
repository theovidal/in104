//crée le code sous-jacent au qr code généré lorsqu'un professeur (et non pas un élève) se connecte

const { Courses } = require('../../db/models')
const { insert_lecture, lectures } = require('../core/lectures')
const courses_fun = require('../controllers/courses');
const lectures_fun = require('../controllers/lectures');
const jwt = require('jsonwebtoken')

module.exports = async function createCode(req, res) {

    //fonction de génération aléatoire de chaîne de caractère, pas optimal mais je le laisse en argument pour la soutenance

    /*function makecode(length) {
        let result = '';
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        const charactersLength = characters.length;
        let counter = 0;
        while (counter < length) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
            counter += 1;
        }
        return result;
    }*/

    //génération et envoie du code, si l'utilisateur est un professeur

    if (res.locals.user.role !== 'professeur') return res.status(403).json({
        error: 'Acces interdit'
    })

    //Verifications

    const lecture_id = req.body.lectureId
    if (lecture_id === undefined) {
        return res.status(400).json({
            error: 'Séance non précisée'
        })
    }

    const lecture = await lectures_fun.getById(lecture_id);
    if (lecture === null) {
        return res.status(400).json({
            error: 'Séance inexistante'
        })
    }
    console.log(lecture);

    const course = await courses_fun.getById(lecture.courseId);

    if (course.teacherId != res.locals.user.id) {
        return res.status(403).json({
            error: 'Accès interdit'
        })
    }

    const attendants = await courses_fun.getAttendantsById(course.id);
    console.log(attendants);

    const date_requete = new Date();
    if (lecture.beginDate > date_requete || lecture.endDate < date_requete) {
        return res.status(400).json({
            error: 'Horaire incompatible'
        })
    }

    const code = jwt.sign({
        lectureId: lecture.id,
    }, process.env.CODES_SECRET, { expiresIn: `${process.env.CODES_EXPIRATION}s` });

    res.json({
        code
    })
}