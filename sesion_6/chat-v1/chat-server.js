const io = require("socket.io")(4000);

io.on("connection", socket => {

    socket.on("enter-room", username => {
        console.log("Se ha conectado", username);
        io.emit("new-user", username);
    });

    socket.on("message", message => {
        console.log(message);
        io.emit("message", message);
    });
});