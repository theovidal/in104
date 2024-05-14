// Action for the pupil of scanning a code, which contains the code of the current lecture

const {read_lecture, lectures} = require('../core/lectures')
const lectures_fun = require('../controllers/lectures');

module.exports = function scanCodeRoute(req, res) {

    if (res.locals.user.role === 'eleve') {

        //Verifications

        qrcode = req.query.code;
        const lecture_id = read_lecture(qr_code);
        
        if (lecture_id === undefined) {
            res.status(400).json({
                error: 'Cours inexistant'
            })
        }



        //Verifier que le code est avec le bon cours -> bonne heure, bon prof

        //Interagir avec la BDD pour mettre l'élève présent

        //C'est tout

    }


}