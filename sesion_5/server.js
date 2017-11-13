const http = require("http");
const express = require("express");
const bodyParser = require("body-parser");
const storage = require("./storage");

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

storage.conectar().then(() => {
    http.createServer(app).listen(3000, () => {
        console.log("Servidor iniciado en http://localhost:3000/");
    });
});

app.get("/productos", (req, res) => {
    storage.verProductos().then(productos => {
        res.send(productos);
    }, err => {
        res.status(400).send(err);
    });
});

app.post("/productos/agregar", (req, res) => {
    const producto = {
        _id: req.body.id,
        nombre: req.body.nombre,
        descripcion: req.body.descripcion,
        costo: req.body.costo,
        existencias: req.body.existencias,
    };

    storage.agregarProducto(producto).then(() => {
        res.send("Producto agregado");
    }, err => {
        res.status(400).send(err);
    });
});