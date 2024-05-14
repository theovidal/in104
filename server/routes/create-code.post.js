//crée le code sous-jacent au qr code généré lorsqu'un professeur (et non pas un élève) se connecte

module.exports = function createCodeRoute(req, res) {

    //fonction de génération aléatoire de chaîne de caractère, pas optimal finalement

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
        //on passe par le module crypto de node, génère un code de 60 caractères
        const crypto = require("crypto");
        const code = crypto.randomBytes(30).toString('hex');
        res.json({
            code: code
        })
    } else { //dans ce cas, res.locals.user.role === 'eleve' normalement
        //On envoie une erreur
        res.status(400).json({
            error: 'Erreur dans la génération du code'
        })
    }
}