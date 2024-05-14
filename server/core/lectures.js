const Mutex = require('async-mutex').Mutex;

const mutex = new Mutex();
let lectures = {};


function insert_lecture(code, lecture) {
    mutex
        .acquire()
        .then(function (release) {
            lectures[code] = lecture;
            release();
        });
}

function delete_lecture(code) {
    mutex
        .acquire()
        .then(function (release) {
            delete lectures[code];
            release();
        });
}

function read_lecture(code) {
    mutex
        .acquire()
        .then(function (release) {
            return lectures[code]; //le cas -undefined- est géré par les routes qui useront de cette fonction
            release();
        });
}

module.exports = {insert_lecture, delete_lecture, read_lecture, lectures}