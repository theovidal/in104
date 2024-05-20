const courses_fun = require('../controllers/courses');
const lectures_fun = require('../controllers/lectures');
const jwt = require('jsonwebtoken')

//Creates a code, used by the professor to give a QR code which is then scanned by pupils
module.exports = async function createCode(req, res) {
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

    if (course.teacherId !== res.locals.user.id) {
        return res.status(403).json({
            error: 'Accès interdit'
        })
    }

    const attendants = await courses_fun.getAttendantsById(course.id);
    console.log(attendants);

    const date_requete = new Date();
    if (lecture.beginDate > date_requete || lecture.endDate < date_requete) {
        return res.status(403).json({
            error: 'Horaire incompatible'
        })
    }

    //Code creation, using a JWT
    
    const code = jwt.sign({
        id: lecture.id,
        ppl: attendants.map(user => user.id)
    }, process.env.CODES_SECRET, { expiresIn: `${process.env.CODES_EXPIRATION}s` });

    res.status(201).json({
        code
    })
}