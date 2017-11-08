# Recetas de Node

## Uso de `for-in`

El iterador `for-in` funciona para recorrer diccionarios, mediante sus claves:

~~~js
const productos = {
    "A": { ... },
    "B": { ... },
    "C": { ... },
}

for (let id in productos) {
    console.log(id);
}
~~~

## Copiar un diccionario en otro

~~~js
const A = { x: 123, y: 456, z: 0, w: 8 };

const B = {};

for (let key in A) {
    const value = A[key];
    B[key] = value;
}
~~~

## Descomposición de diccionarios

Podemos descomponer un diccionario en variables mediante el operador `{·}`:

~~~js
const diccionario = { x: 123, y: 432, z: 0 };

const { x, y } = diccionario;

console.log(x, y);
~~~ 

## Crear un servidor con Express

* Instalar el módulo `Express` con `npm`

    $ npm install express

* Importar `http` y `express`, crear la instancia app y montar el servidor.

~~~js
const http = require("http");
const express = require("express");

const app = express();

http.createServer(app).listen(3000, () => {
    console.log("Servidor iniciado en http://localhost:3000/");
    console.log("Presiona CTRL+C para finalizar");
});
~~~

## Almacenar datos complejos en un archivo JSON

* Crear un archivo JSON que almacene los datos solamente (`números`, `cadenas`, `booleanos`, `null`, `arreglos []`, `diccionarios/objetos {}`).

~~~json
{
    "mute": false,
    "lastSession": "2017-08-21T14:00:00.000Z",
    "datos": {
        "x": 123,
        "y": 12.8
    }
}
~~~

## Montar una ruta en el servidor

* Ruta estática

~~~js
app.get("/hola", (req, res) => {
    res.send("Hola mundo");
});
~~~

* Ruta dinámica

~~~js
app.get("/hola/:nombre", (req, res) => {
    const nombre = req.params.nombre || "Anónimo";
    res.send(`Hola ${nombre}`);
});
~~~

## Recibir parámetros desde el método GET mediante su query

* Una url se compone de `http://host:port/path?query` donde `?query` es opcional y se basa en campos separados por `&`, por ejemplo, `?a=123&nombre=Ana%20Diaz`.

~~~js
app.get("/hola", (req, res) => {
    const { a, nombre } = req.query; // a = req.query.a, nombre = req.query.nombre
    res.send(`Hola ${nombre}, a = ${a}`);
});
~~~

## Conectar Mongo DB con Node JS

> Instalar mongodb `$ npm install mongodb`

> Crear una conexión a Mongo con MongoClient

~~~js
const MongoClient = require("mongodb").MongoClient;
//const { MongoClient } = require("mongodb");

const uri = "mongodb://localhost:27017/mitienda";

MongoClient.connect(uri, (err, db) => {
    if (err) {
        console.log("Hubo un error", err);
        return;
    }

    db.collection("productos").find({}).toArray((err, docs) => {
        if (err) {
            console.log("Hubo un error", err);
            return;
        }

        console.log(docs);
    });
});
~~~