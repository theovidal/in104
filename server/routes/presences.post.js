// Action for the pupil of scanning a code, which contains the code of the current lecture

const {read_lecture, lectures} = require('../core/lectures')
const lectures_fun = require('../controllers/lectures');
const users_fun = require('../controllers/users');
const courses_fun = require('../controllers/courses');
const jwt = require('jsonwebtoken');

// Mark a pupil present if :
// - they scan a code
// - a teacher or the administration marks them as present

module.exports = async function createPresence(req, res) {
    if (res.locals.user.role === 'eleve') {
        const qrcode = req.body.code;
        if (qrcode === undefined) return res.status(400).json({
            error: "Must include code in the request"
        })

        jwt.verify(qrcode, process.env.CODES_SECRET, async (err, payload) => {
            if (err) return res.status(400).send(err);

            if (!payload.ppl.includes(res.locals.user.id)) return res.status(400).json({
                error: "Vous n'êtes pas inscrits à ce cours."
            })

            await lectures_fun.updatePresence(payload.id, res.locals.user.id, true);
            return res.status(204).send();
        })
    } else {
        const pupilId = req.body.userId
        if (pupilId === undefined) return res.status(400).json({
            error: "Must include userId to the request"
        })

        const pupil = await users_fun.getById(pupilId);
        if (pupil === null) return res.status(400).json({
            error: "unknown user"
        })

        const lectureId = req.body.lectureId
        if (lectureId === undefined) return res.status(400).json({
            error: "Must include lectureId to the request"
        })

        const lecture = await lectures_fun.getById(lectureId);
        if (lecture === null) return res.status(400).json({
            error: "unknown lecture"
        })

        // Only the administration should be able to edit the appointment
        const present = new Date();
        if (res.locals.user.role === 'professeur' && present < lecture.beginDate && present > lecture.endDate) return res.status(403).json({
            error: "A teacher cannot modify the appointment after the lecture"
        })

        await lectures_fun.updatePresence(lecture.id, pupil.id, true);
        res.status(204).send();
    }
}