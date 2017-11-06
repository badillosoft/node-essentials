const http = require('http');
const express = require('express');

const app = express();

// Métodos HTTP
// GET POST PUT DELETE ...

// Definir una ruta de recursos
// PATH (string) - CONTRALADOR (function)
app.get("/", function (request, response) {
    // request almacena los datos enviados por el cliente en la solicitud
    // response provee métodos para responder datos al cliente
    response.send("Hola cliente");
});
app.get("/hora", function (request, response) {
    response.send(new Date().toLocaleString());
});
app.get("/hola", function (request, response) {
    const nombre = request.query.nombre || "Anónimo";
    // Inyección de cadenas
    response.send(`Hola <strong>${nombre}</strong>, Como estás?`);
});

http.createServer(app).listen(3000, function () {
    console.log("Servidor iniciado en http://localhost:3000/");
    console.log("Presiona ctr+c para terminar");
});
