function suma(a, b) {
    return a + b;
}

console.log(suma(1, 3));
console.log(suma(5, 8));
console.log(suma(10, 20));

// Función anónima
const suma2 = function (a, b) {
    return a + b;
};

console.log(suma2(1, 3));
console.log(suma2(5, 8));
console.log(suma2(10, 20));

// Aplicaciones

function filtro(arreglo) {
    const arregloFiltrado = [];

    for (let x of arreglo) {
        if (x > 5) {
            arregloFiltrado.push(x);
        }
    }

    return arregloFiltrado;
}

console.log(filtro([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]));

// x > 5 => true | false (booleano)
// f(x) = x > 5 => true | false (booleano)
// g(x) = x < 2 => true | false (booleano)

function filtro2(arreglo, f) {
    const arregloFiltrado = [];

    for (let x of arreglo) {
        if (f(x)) {
            arregloFiltrado.push(x);
        }
    }

    return arregloFiltrado;
}

function f(x) {
    /*if (x > 5) {
        return true;
    } else {
        return false;
    }*/
    return x > 5;
}

console.log("10 > 5?", f(10));
console.log("2 > 5?", f(2));

console.log(filtro2([8, 4, 2, 9, 5, 6, 4], f));