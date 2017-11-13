const { conectar, agregarProducto } = require("./storage");

conectar().then(() => {
    agregarProducto({
        nombre: "Korn Flakes",
        descripcion: "Creal integral",
        costo: 3.5,
        existancias: 1000
    }).then(result => {
        console.log(result);
    }).catch(err => {
        console.log(err);
    });

    agregarProducto({
        nombre: "Coca-Cola",
        descripcion: "Refresco de cola",
        costo: 0.5,
        existancias: 2000
    }).then(result => {
        console.log(result);
    }).catch(err => {
        console.log(err);
    });
});