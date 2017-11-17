const MongoClient = require("mongodb").MongoClient;

let db = null;

function connect(url) {
    return new Promise((resolve, reject) => {
        MongoClient.connect(url, (err, _db) => {
            if (err) {
                reject(err);
                return;
            }
            db = _db;
            console.log("Conexión establecida a", url);
            resolve(db);
        });
    });
}

function login(username, password) {
    return new Promise((resolve, reject) => {
        db.collection("users").findOne({ username, password }, (err, user) => {
            if (err) {
                reject(err);
                return;
            }
            if (!user) {
                reject("El usuario no existe");
                return;
            }
            resolve(user);
        });
    });
}

module.exports = {
    connect,
    login
};