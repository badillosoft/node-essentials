const io = require("socket.io")(4000);

io.on("connection", socket => {

    socket.on("login", (user, password) => {
        if (user === "batman" && password === "robin") {
            socket.emit("login-success", socket.id);
            return;
        }
        socket.emit("login-error", "Credenciales incorrectas");
    });

});