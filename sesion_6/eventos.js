class Event {

    constructor() {
        this.listeners = {};
    }

    addEventListener(eventName, callback) {
        if (!this.listeners[eventName]) {
            this.listeners[eventName] = [];
        }
        this.listeners[eventName].push(callback);
    }

    emit(eventName, ...args) {
        if (!this.listeners[eventName]) {
            console.log("No existe el evento", eventName);
            return;
        }
        for (let callback of this.listeners[eventName]) {
            callback(...args);
        }
    }

}

const miEvento = new Event();

miEvento.addEventListener("onConnected", db => {
    console.log("Conectado 1", db);
});

miEvento.addEventListener("onConnected", db => {
    console.log("Conectado 2", db);
});

miEvento.addEventListener("onFinished", () => {
    console.log("Finalizado");
});

miEvento.emit("onConnected", "Soy la base de datos 1");
miEvento.emit("onConnected", "Soy la base de datos 2");
miEvento.emit("onConnected", "Soy la base de datos 3");