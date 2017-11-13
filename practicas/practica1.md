# Práctica I - Dominando los módulos en Node

<small>Alan Badillo Salas (badillo.soft@hotmail.com)</small>

Un archivo plano con extensión `js` representa un archivo ejecutable por `Node` el cual contendrá las instrucciones en el lenguaje `Javascript`. Podemos definir variables, funciones e incluso mandar a llamar módulos y funciones. Para que nuestro código sea útil debemos aprender a exportar los objetos definidos en nuestro archivo.

## Exportar variables y funciones

El objeto `module.exports` contendrá todo lo que se desee exportar en nuestro archivo `js`, véa el siguiente archivo que exporta un diccionario con distintos valores y funciones.

> mi_modulo.js

~~~js
const a = 123;
let b = 456;

function saludar() {
    console.log("Hola node");
}

module.exports = {
    a: a, // equivale a poner "a": a o 'a': a
    b, // Equivale a poner b: b
    saludar: saludar,
    linea: (t) => {
        return (b - a) * t + a;
    } // Equivale a linea: t => (b - a) * t + a
};
~~~

Observa que el archivo anterior exporta un diccionario el cual expone las variables locales definidas en el archivo.

## Importar un módulo

Para importar un módulo haremos uso de la función `require` la cual recibe el nombre del módulo (con su ruta relativa si es un módulo local).

> mi_modulo.test.js

~~~js
const mi_modulo = require("./mi_modulo"); // La extensión `js` se puede omitir

mi_modulo.saludar();

console.log(mi_modulo.a);
~~~

También podemos importar sólo ciertas partes del módulo cuando se trata de un objeto.

~~~js
const saludar = require("./mi_modulo").saludar; // La extensión `js` se puede omitir

saludar();
~~~

Mejor aún, podemos usar la descomposición de diccionarios para cargar las partes del módulo.

~~~js
const { a, b } = require("./mi_modulo"); // La extensión `js` se puede omitir

console.log(a, b);
~~~

## Instalar un módulo con `npm`

Existe un administrador de paquetes que nos va a permitir instalar desde internet módulos definidos por otros programadores. Visita https://www.npmjs.com/ para buscar un módulo que resuelva las tareas que planeas programar.

> `$ npm install <nombre del modulo>`

## Problemas

* Crear un módulo que defina dos variables mutables `let x = 0;` y `let y = 0;`.
* Exporta una función que se llame `incX(dx)` que incremente a `x` en `dx`.
* Exporta una función que se llame `incY(dy)` que incremente a `y` en `dy`.