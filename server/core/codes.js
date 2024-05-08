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

function delete_code(key) {
    mutex
        .acquire()
        .then(function (release) {
            //codes à l'id id_professeur = code, jsp comment le traduire en code...
            delete codes[key];
            release();
        });
}

function read_code(key) {
    mutex
        .acquire()
        .then(function (release) {
            //codes à l'id id_professeur = code, jsp comment le traduire en code...
            return codes[key]; //le cas -undefined- est géré par les routes qui useront de cette fonction
            release();
        });
}

module.exports = {insert_code, delete_code, read_code, codes}