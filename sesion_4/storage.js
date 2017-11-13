/// Configuración de la Base de Datos

const MongoClient = require("mongodb").MongoClient;

let db = null;

const uri = "mongodb://localhost:27017/kmmx";

MongoClient.connect(uri, (err, _db) => {
    if (err) {
        process.exit();
        return;
    }

    db = _db;
});

/// Definición de las funciones provistas

// cliente - diccionario que contiene todos los datos que se van a almacenar
function registrarCliente(cliente) {
    return new Promise((resolve, reject) => {
        db.collection("clientes").insertOne(cliente, (err, result) => {
            if (err) {
                reject(err);
                return;
            }
            resolve(result);
        });
    });
}

// 0: 1 - 50 | skip: 0 | limit: 50
// 1: 51 - 100 | skip: 50 | limit: 50
// 2: 101 - 150 | skip: 100 | limit: 50
// n: (n * 50 + 1) - ((n + 1) * 50) | skip: n * 50 | limit: 50

function obtenerClientes(numPagina, tamPagina) {
    return new Promise((resolve, reject) => {
        db.collection("clientes").find({})
            .skip(numPagina * tamPagina)
            .limit(tamPagina)
            .toArray((err, clientes) => {
                if (err) {
                    reject(err);
                    return;
                }
                resolve(clientes);
            });
    });
}

// obtenerClientes(3, 20).then(clientes => { 
//     res.send(clientes);
// }).catch(err => {
//     console.log("Ocurrió un error", err);
// });

module.exports = {
    registrarCliente, // registrarCliente: registrarCliente
    obtenerClientes, // obtenerClientes: ObtenerClientes
};

//module.export.registrarCliente = () => {};