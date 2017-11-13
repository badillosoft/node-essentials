# Práctica II - Crear un servidor en Express

<small>Alan Badillo Salas (badillo.soft@hotmail.com)</small>

Para definir un servidor en `express` debemos instalar e importar el módulo del mismo nombre y montar un servidor `http` con la instancia de express llamada `app`.

## Montar un servidor Express

> `$ npm install express`

~~~js
const http = require("http");
const express = require("express");

const app = express();

http.createServer(app).listen(3000, () => {
    console.log("Servidor iniciado en http://localhost:3000/");
});
~~~

## Definir rutas en Express

Una ruta es un recurso que provee el servidor y cuando es invocada podemos controlar lo que se envía al cliente y obtener los metadatos de la petición. Por ejemplo, si en el navegador se llama a la ruta `http://localhost:3000/hola` la ruta es `/hola` y el método es `GET` ya que fue invocada por cualquier servidor, pero si llamamos a la ruta `curl -X POST http://localhost:3000/hola` está será la misma ruta `/hola` pero bajo el método `POST`.

~~~js
// ... Montar app = express();

app.get("/hola", (request, response) => {
    res.send("Hola desde cualquier navegador");
});

app.post("/hola", (request, response) => {
    res.send("Hola desde cualquier llamada post");
});

// ... Montar el servidor http
~~~

## Recuperar los parámetros query de una ruta

Cada ruta cuando es llamada puede ser invocada con distintos parámetros `query`, por ejemplo, la url `http://localhost:3000/usuarios/todos?limite=100&activo=si` manda a llamar a la ruta `/usuarios/todos` con el query `{ limite: "100", activo="si" }`.

~~~js
app.get("/usuarios/todos", (request, response) => {
    const query = request.query;
    console.log("limite", query.limite);
    console.log("activo", query.activo);
    response.send(query);
});
~~~

## Recuperar los parámetros variables de una ruta

Podemos definir rutas que contengan partes variables para recibirlas en una variables, por ejemplo, la url `http://localhost:3000/mensajes/:id` manda a llamar a una ruta variable con el parámetro `id`.

~~~js
app.get("/mensajes/:id", (request, response) => {
    const params = request.params;
    console.log("ID", params.id);
    response.send(`Tu id es ${params.id}`);
});
~~~

## Recuperar el cuerpo de un formulario o un fragmento `json` en llamadas POST

El cuerpo de una llamada post es conocido como el `body` de la petición, por ejemplo, cuando en un formulario establecemos `<form action="url" method="post">` todos los campos del formulario son enviados en el `body` de la petición. Pero además cuando hacemos la llamada `curl -X POST url -H 'Content-Type:application/json' -d '{"a": 123, "b": "Hola json"}'` podemos enviar un documento `json` en la petición. En ambos casos tenemos que instalar el módulo `$ npm install body-parser` para poder procesar dichos datos.

~~~js
const bodyParser = require("body-parser");

app.use(bodyParser.json());
app.use(bodyParser.urlEncoded({ extended: true }));

// ...

app.post("/usuarios/nuevo", (request, response) => {
    const body = request.body;
    console.log("Nombre", body.nombre);
    console.log("Edad", body.edad);
    console.log("Calle", body.calle);
    response.send(body);
});
~~~

Pruebe crear el formulario

~~~html
<form action="http://localhost:3000/usuarios/nuevo" method="post">
    <input id="nombre" name="nombre" placeholder="nombre" type="text" />
    <input id="edad" name="edad" placeholder="edad" type="number" />
    <input id="calle" name="calle" placeholder="calle" type="text" />
    <input type="submit" value="enviar" />
</form>
~~~

## Problemas

* Definir las rutas para registrar un nuevo producto, ver todos los productos, mostrar un producto en específico, actualizar y eliminar un producto en específico.
* Agrega funcionalidad falsa mediante arreglos y dicionarios almacenados en memoria.