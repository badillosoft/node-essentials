const app = require("express")();
const http = require("http").Server(app);
const io = require("socket.io")(http);
const bodyParser = require("body-parser");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", 
        "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

const recipes = [];

app.post("/recipes/new", (req, res) => {
    const {name, picture, content} = req.body;
    recipes.push({name, picture, content});
    console.log(recipes.map(r => r.name));
    io.emit("recipe-new");
    res.send("enviado");
});

app.get("/recipes", (req, res) => {
    res.send(recipes);
});

http.listen(3000, () => {
    console.log("Bienvenido a Recipes App v1.0");
    console.log("Servidor iniciado en http://localhost:3000");
});