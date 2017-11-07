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

## Montar una ruta en el servidor

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

