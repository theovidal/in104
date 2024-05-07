const Mutex = require('async-mutex').Mutex;

const mutex = new Mutex();
let codes = {};


function insert_code(key, value) {
    mutex
        .acquire()
        .then(function (release) {
            //codes à l'id id_professeur = code, jsp comment le traduire en code...
            codes[key] = value;
            release();
        });
}

//fonction de delete, de read, delete codes[key], read renvoie undefined si codes[key] n'existe pas

module.exports = {insert_code, codes}