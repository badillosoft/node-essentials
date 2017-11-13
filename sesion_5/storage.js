/// Conectarse a la base de datos

const { MongoClient } = require("mongodb");

let db = null;

function conectar() {
    return new Promise((resolve, reject) => {
        MongoClient.connect("mongodb://127.0.0.1:27017/mi_tienda", (err, _db) => {
            if (err) {
                console.log(err);
                reject(err);
                return;
            }
            db = _db;
            resolve(db);
        });
    });
}

/// Definir los métodos que provee nuestro almacén

function agregarProducto(producto) {
    return new Promise((resolve, reject) => {
        db.collection("productos").insertOne(producto, (err, result) => {
            if (err) {
                reject(err);
                return;
            }
            resolve("Producto agregado");
        });
    });
}

function verProductos() {
    return new Promise((resolve, reject) => {
        db.collection("productos").find({}, { _id: 0 }).toArray((err, productos) => {
            if (err) {
                reject(err);
                return;
            }
            resolve(productos);
        });
    });
}

function 

module.exports = {
    conectar,
    agregarProducto,
    verProductos
};