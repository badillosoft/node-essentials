const http = require("http");
const express = require("express");
const bodyParser = require("body-parser");
const { MongoClient } = require("mongodb");

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

let db = null;

const uri = "mongodb://localhost:27017/mitienda";

MongoClient.connect(uri, (err, _db) => {
    if (err) {
        console.log("No se puede establecer conexión a mongo", err);
        process.exit();
        return;
    }

    db = _db;
});

app.get("/productos", (req, res) => {
    db.collection("productos").find({
        descripcion: { $regex: "refresco", $options: "i" }
    }, { _id: 0, inventario: 0 }).toArray((err, docs) => {
        if (err) {
            res.send(err);
            return;
        }

        res.send(docs);
    });
});

app.post("/productos/nuevo", (req, res) => {
    const { nombre, descripcion, costo, existencia } = req.body;

    db.collection("productos").insertOne({
        nombre: nombre,
        descripcion: descripcion,
        costo: Number(costo),
        existencia: Number(existencia)
    }, (err, result) => {
        if (err) {
            res.send(err);
            return;
        }
        res.send(result);
    });
});

http.createServer(app).listen(3000, () => {
    console.log("Servidor iniciado en http://localhost:3000/");
    console.log("Presiona CTRL+C para finalizar");
});