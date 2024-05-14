//crée le code sous-jacent au qr code généré lorsqu'un professeur (et non pas un élève) se connecte

const { Courses } = require('../../db/models')
const { insert_code } = require('../core/codes')
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

    if (res.locals.user.role === 'professeur') {
        const lecture_id = req.body.lectureId
        if (lecture_id === undefined) {
            res.status(400).json({
                error: 'Cours inexistant'
            })
        }

        cours_id = getById(cours_id);
        if (cours_id === null) {
            res.status(400).json({
                error: 'Cours inexistant'
            })
        }

        if (cours_id.teacherId != res.locals.use.role) {
            res.status(403).json({
                error: 'Accès interdit'
            })
        }

        const date_requete = new Date();
        const date_debut = cours_id.createdAt;
        const date_fin = cours_id.createdAt;
        date_fin.setTime(date_fin.getTime() + 3_600_000);
        //date_fin.setTime(date_fin.getTime() + cours_id.durationMinutes * 60_000);

        if (date_debut > date_requete || date_fin < date_requete) {
            res.status(400).json({
                error: 'Horaire incompatible'
            })
        }

        //on passe par le module crypto de node, génère un code de 60 caractères
        const crypto = require("crypto");
        const code = crypto.randomBytes(30).toString('hex');
        insert_code(code, cours_id);
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