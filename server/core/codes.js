const mutex = new Mutex();
let codes = {};
//fonction qui insert un code dedans, avec le mutex, dans le release il va juste (enft g pas compris ça me fume)
//Bcp de choses pas claires dans ma tête

function insert_code(req, res) {
    mutex
        .acquire()
        .then(function (release) {
            //codes à l'id id_professeur = code, jsp comment le traduire en code...

            release();
        });
}