//crée le code sous-jacent au qr code généré lorsqu'un professeur (et non pas un élève) se connecte

const { Courses } = require('../../db/models')
const { insert_lecture, lectures } = require('../core/lectures')
const { getById } = require('../controllers/courses')

module.exports = function createCodeRoute(req, res) {

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

    if (res.locals.user.role === 'professeur') {*

        //Verifications

        const lecture_id = req.body.lectureId
        if (lecture_id === undefined) {
            res.status(400).json({
                error: 'Cours inexistant'
            })
        }

        lecture_id = getById(lecture_id);
        if (lecture_id === null) {
            res.status(400).json({
                error: 'Cours inexistant'
            })
        }

        const course_id = getById(lecture_id.courseId);

        if (course_id.teacherId != res.locals.user.role) {
            res.status(403).json({
                error: 'Accès interdit'
            })
        }

        const date_requete = new Date();
        const date_debut = lecture_id.createdAt;
        const date_fin = lecture_id.createdAt;
        date_fin.setTime(date_fin.getTime() + 3_600_000);
        //date_fin.setTime(date_fin.getTime() + lecture_id.durationMinutes * 60_000);

        if (date_debut > date_requete || date_fin < date_requete) {
            res.status(400).json({
                error: 'Horaire incompatible'
            })
        }

        //on passe par le module crypto de node, génère un code de 60 caractères
        const crypto = require("crypto");
        const code = crypto.randomBytes(30).toString('hex');
        insert_code(code, lecture_id);
        res.json({
            code: code
        })

    } else { //dans ce cas, res.locals.user.role === 'eleve' normalement
        //On envoie une erreur
        res.status(403).json({
            error: 'Erreur dans la génération du code'
        })
    }
}