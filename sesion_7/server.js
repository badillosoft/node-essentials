const io = require("socket.io")(4000);

io.on("connection", socket => {
    socket.emit("welcome", socket.id);

    socket.on("foo", mensaje => {
        console.log("Se ha llamdo al evento foo", mensaje);
    });
    
    socket.on("bar", n => {
        console.log("Se ha llamdo al evento bar", n);
    });

    // Enviar a todos
    io.emit("new-user", socket.id);
});