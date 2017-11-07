const http = require("http");
const express = require("express");

const app = express();

const productos = require("./productos.json");

app.get("/productos", (request, response) => {
    response.send(productos);
});

// Para crear una ruta dinámica podemos especificar
// la parte dinámica, por ejemplo, :id, la cual
// va almacenar esa parte dinámica en el parámetro id
app.get("/productos/:id", (req, res) => {
    const id = req.params.id.toUpperCase();
    res.send(productos[id] || {});
});

http.createServer(app).listen(3000, () => {
    console.log("Servidor iniciado en http://localhost:3000/");
    console.log("Presiona CTRL+C para finalizar");
});