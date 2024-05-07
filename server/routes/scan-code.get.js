// Action for the pupil of scanning a code, which contains the code of the current lecture

const { insert_code , codes} = require('../core/codes')

module.exports = function scanCodeRoute(req, res) {
    if (res.locals.user.role === 'eleve') {
        qrcode = req.query.code;
        //Verifier que le code existe dans le dico create-code
    
        //Verifier que le code est avec le bon cours -> bonne heure, bon prof

        //Interagir avec la BDD pour mettre l'élève présent

        //C'est tout
        res.status(204).send()
    }
    res.status(403).send()

}