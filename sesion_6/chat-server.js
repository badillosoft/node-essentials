const io = require("socket.io")(4000);

io.on("connection", socket => {
    console.log("Se ha conectado", socket.id);

    socket.on("hola", mensaje => {
        console.log("El cliente dice:", mensaje);
        socket.emit("respuesta", "Hola soy el servidor");
    });
});