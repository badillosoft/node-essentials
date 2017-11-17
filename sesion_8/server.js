const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const bodyParser = require("body-parser");
//const io = require("socket.io")(server);
const nunjucks = require("nunjucks");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

nunjucks.configure('views', {
    autoescape: true,
    express: app
});

app.get("/login", (req, res) => {
    res.render("login.html");
});

server.listen(3000, () => {
    console.log("Servidor iniciado");
});