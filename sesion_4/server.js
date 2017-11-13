const http = require("http");
const express = require("express");
const bodyParser = require("body-parser");
const storage = require("./storage");

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/clientes", (request, response) => {
    storage.obtenerClientes(0, 10).then(clientes => {
        response.send(clientes);
    }).catch(err => {
        response.status(400).send(err);
    });
});

app.post("/cliente/nuevo", (request, response) => {
    const { rut, nombre, calle, numero, zona } = request.body;
    storage.registrarCliente({
        _id: rut,
        nombre,
        direccion: {
            calle,
            numero,
            zona
        }
    }).then(result => {
        response.send(result);
    }).catch(err => {
        response.status(400).send(err);
    });
});

http.createServer(app).listen(3000, () => {
    console.log("Servidor iniciado");
});