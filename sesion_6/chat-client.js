const io = require("socket.io-client");

const socket = io("http://localhost:4000/");

socket.emit("hola", "Hola soy el cliente");

socket.on("respuesta", mensaje => {
    console.log("El servidor dice:", mensaje);
});