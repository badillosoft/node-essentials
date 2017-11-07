const http = require("http");
const express = require("express");

const app = express();

// Cliente solicita agente
// Cliente checa si tiene agente

const solicitudes = [];

app.get("/solicitar", (req, res) => {
    const token = req.query.token;

    if (!token) {
        res.send("ERROR - no hay token");
        return;
    }

    solicitudes.push(token);

    res.send("Tu agente está siendo asignado, ingresa a /agente");
});

const agentes = {};

app.get("/agente", (req, res) => {
    const token = req.query.token;
    
    if (!token) {
        res.send("ERROR - no hay token");
        return;
    }

    res.send(agentes[token] || {});
});

setInterval(() => {
    console.log("Procesando solicitudes:", solicitudes);
    // TODO: Asignar agentes
    for (let token of solicitudes.splice(0, 3)) {
        agentes[token] = {
            nombre: "Fermin",
            area: "Soporte Técnico"
        };
    }
}, 10000);

http.createServer(app).listen(3000, () => {
    console.log("Servidor iniciado en http://localhost:3000/");
    console.log("Presiona CTRL+C para finalizar");
});