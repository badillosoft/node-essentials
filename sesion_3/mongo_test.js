const MongoClient = require("mongodb").MongoClient;
//const { MongoClient } = require("mongodb");

const uri = "mongodb://localhost:27017/mitienda";

MongoClient.connect(uri, (err, db) => {
    if (err) {
        console.log("Hubo un error", err);
        return;
    }

    db.collection("productos").find({}).toArray((err, docs) => {
        if (err) {
            console.log("Hubo un error", err);
            return;
        }

        console.log(docs);
    });
});