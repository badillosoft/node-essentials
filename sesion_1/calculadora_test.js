// Importación Goblal
const calc = require('./calculadora');

console.log(calc.suma(1, 3));
console.log(calc.multiplicacion(10, 123));

// Importación unitaria de diccionarios

const { suma, resta } = require('./calculadora');

console.log(suma(1, 3));
console.log(resta(5, 2));

// Descomposición de un diccionario en variables mediante sus claves

const dic = { x: 12, y: 34, z: 56 };

const { x, y } = dic;

console.log(x, y);