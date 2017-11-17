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

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", 
        "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

nunjucks.configure('views', {
    autoescape: true,
    express: app
});

app.get("/", (req, res) => {
    res.render("chat.html");
});

app.get("/login", (req, res) => {
    res.render("login.html");
});

app.post("/api/login", (req, res) => {
    const { username, password } = req.body;

    storage.login(username, password).then(user => {
        res.send(user);
    }, err => {
        res.status(400).send({
            error: true,
            message: err
        });
    });
});

app.get("/api/messages", (req, res) => {
    const { username } = req.query;

    storage.getMessages(username).then(messages => {
        res.send(messages);
    }, err => {
        res.status(400).send(err);
    });
});

storage.connect("mongodb://localhost:27017/chat").then(() => {
    server.listen(3000, () => {
        console.log("Servidor iniciado en http://localhost:3000/");
    });
});