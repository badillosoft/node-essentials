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
        db.collection("users").findOne({ username, password }, 
            { _id: 0, password: 0 }, (err, user) => {
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

function getMessages(username) {
    return new Promise((resolve, reject) => {
        db.collection("messages").find({ to: username }, 
            { _id: 0 }).toArray((err, messages) => {
                if (err) {
                    reject(err);
                    return;
                }
                resolve(messages);
            });
    });
}

module.exports = {
    connect,
    login,
    getMessages
};