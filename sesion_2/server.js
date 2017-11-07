const http = require("http");
const express = require("express");
const nunjucks = require("nunjucks");

const app = express();

nunjucks.configure('views', {
    autoescape: true,
    express: app
});

const productos = require("./productos.json");

// Para crear una ruta dinámica podemos especificar
// la parte dinámica, por ejemplo, :id, la cual
// va almacenar esa parte dinámica en el parámetro id
app.get("/productos/:id", (req, res) => {
    const id = req.params.id.toUpperCase();
    res.send(productos[id] || {});
});

app.get("/productos", (req, res) => {
    const { costoMayor } = req.query;

    if (costoMayor) {
        const productosFiltados = {};

        // productos = { "A123": { ... }, "B321": { ... }, "XA23": { ... } }

        for (let id in productos) {
            // id = "A123"
            let producto = productos[id]; // productos["A123"]
            // producto = { "nombre": "Coca", ... }
            if (producto.costo >= Number(costoMayor)) {
                productosFiltados[id] = producto;
            }
        }

        res.send(productosFiltados);
        return; // OJO
    }

    res.send(productos);
});

// render envía una plantilla html desde la carpeta views
app.get("/hola", (req, res) => {
    res.render("hola.html", {
        nombre: "Beto Cuevas",
        productos: Object.keys(productos).map(key => productos[key])
    });
});

/*app.get("/productos", (req, res) => {
    const { costoMayor } = req.query;

    const productosFiltrados = Object.keys(productos).filter(key => {
        return productos[key].costo > Number(costoMayor || 0);
    }).map(key => productos[key]);

    res.send(productosFiltrados);
});*/

http.createServer(app).listen(3000, () => {
    console.log("Servidor iniciado en http://localhost:3000/");
    console.log("Presiona CTRL+C para finalizar");
});