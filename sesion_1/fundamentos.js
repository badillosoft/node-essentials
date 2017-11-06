// Variables fijas

const a = 12;
const mensaje = "HOLA";

// mensaje = "MUNDO"; // ERROR

// Variables asignables

let edad = 28;

edad = 13;

{
    let b = true;
}

// console.log(b); // ERROR

// TIPOS DE DATOS

// - Números: 123, 123.0
// - Cadenas: "Hola", 'Hola'
// - Booleanos: true, false
// - Nulos: undefined, null

// COLECCIONES - ARREGLOS

const numeros = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

const persona = ["Beto", 34, true, null, [1, 2, 3]];

console.log(persona[2]);

const n = numeros.length; // Tamaño del arreglo

numeros.push(11); // Inserta el 11 al final del arreglo
numeros.pop(); // Quita el último elemento del arreglo
numeros.unshift(0); // Inserta los elementos al principio del arreglo
numeros.shift(); // Quita el primer elemento del arreglo

//numeros.slice(3, 6); // Devuelve los elementos del índice inicial al final
//numeros.splice(3, 6); // Quita y devuelve los elementos del arreglo

// CICLO FOR (tradicional)

for (let i = 0; i < numeros.length; i++) {
    console.log(numeros[i]);
}

// CICLO FOR-OF (arreglos)

for (let x of numeros) {
    console.log("x =", x);
}

// COLECCIONES - DICCIONARIOS

const datos = {
    nombre: "Beto",
    edad: 34,
    activo: true,
    nss: null,
    claves: [1, 2, 3],
};

// Nota: podemos crear claves entre comillas: { "x": 1, 'y': 5 }

// Acceder a los datos de un diccionario

// console.log(datos["nombre"]); // Viejo estilo

console.log(datos.nombre);
console.log(datos.claves[1]);

// CICLO FOR-IN

for (let key in datos) {
    console.log(key, datos[key]);
}