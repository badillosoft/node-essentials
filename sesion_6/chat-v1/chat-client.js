const io = require("socket.io-client");

const socket = io("http://localhost:4000/");

socket.emit("enter-room", "carlos");

socket.on("new-user", username => {
    console.log("Se conectó el usuario", username);
});

socket.emit("message", "Hola soy carlos :O");

socket.on("message", message => {
    console.log(message);
});