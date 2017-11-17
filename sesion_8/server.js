const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const bodyParser = require("body-parser");
//const io = require("socket.io")(server);
const nunjucks = require("nunjucks");
const storage = require("./storage");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

nunjucks.configure('views', {
    autoescape: true,
    express: app
});

app.get("/login", (req, res) => {
    res.render("login.html");
});

app.post("/api/login", (req, res) => {
    const { username, password } = req.body;

    storage.login(username, password).then(user => {
        res.render("chat.html");
    }, err => {
        res.render("login.html", {
            error: "Acceso incorrecto"
        });
    });
});

storage.connect("mongodb://localhost:27017/chat").then(() => {
    server.listen(3000, () => {
        console.log("Servidor iniciado en http://localhost:3000/");
    });
});