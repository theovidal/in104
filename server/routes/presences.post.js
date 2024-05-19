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
    } 
}