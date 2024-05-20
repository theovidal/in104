const lectures_fun = require('../controllers/lectures');
const users_fun = require('../controllers/users');
const jwt = require('jsonwebtoken');
const courses_fun = require('../controllers/courses')

// Mark a pupil present if :
// - they scan a code
// - a teacher or the administration marks them as present

// PATCH :
// - Pupil can only put "present" and "code"
// - Others must have lectureId (in correct date for teachers) and pupilId

module.exports = async function createPresence(req, res) {
    if (res.locals.user.role === 'eleve') {
        const qrcode = req.body.code;
        if (qrcode === undefined) return res.status(400).json({
            error: "Le code ne peut pas être vide"
        })

        jwt.verify(qrcode, process.env.CODES_SECRET, async (err, payload) => {
            if (err) return res.status(400).send({
                error: "Le code est invalide ou expiré."
            });

            if (!payload.ppl.includes(res.locals.user.id)) return res.status(400).json({
                error: "Vous n'êtes pas inscrits à ce cours."
            })

            await lectures_fun.updatePresence(payload.id, res.locals.user.id, true);
            return res.status(204).send();
        })
    } else {
        const lectureId = req.body.lectureId
        if (lectureId === undefined) return res.status(400).json({
            error: "Must include lectureId to the request"
        })

        const lecture = await lectures_fun.getById(lectureId);
        if (lecture === null) return res.status(400).json({
            error: "unknown lecture"
        })
        if (res.locals.user.role === 'professeur') {
            const course = await courses_fun.getById(lecture.courseId);

            if (course.teacherId !== res.locals.user.id) return res.status(403).json({
                error: "Accès interdit : vous n'êtes pas le professeur chargé de ce cours"
            })
            // Only the administration should be able to edit the appointment before or after the lecture
            const now = new Date();
            if (now < lecture.beginDate && now > lecture.endDate) return res.status(403).json({
                error: "Vous ne pouvez pas modifier l'appel hors de l'horaire du cours"
            })
        }

        const present = req.body.present
        if (typeof(present) !== 'boolean') return res.status(400).json({
            error: '"present" must be a boolean'
        })

        const pupilId = req.body.userId
        if (pupilId === undefined) return res.status(400).json({
            error: "Must include userId to the request"
        })

        const pupil = await users_fun.getById(pupilId);
        if (pupil === null) return res.status(400).json({
            error: "unknown user"
        })

        await lectures_fun.updatePresence(lecture.id, pupil.id, present);
        res.status(204).send();
    }
}