// MAPEO

// Es una transformación de los elementos de un arreglo
// [1, 2, 3] => [2, 4, 6]

const a = [1, 2, 3];

const T = function (x) {
    return 2 * x;
};

const b = a.map(T);

const c = a.map(function (x) {
    return 2 * x;
});

console.log(c);

// EXPRESIONES LAMBDA / FLECHA

const d = a.map(x => 2 * x); // ES6 - 2015

// FILTROS

const A = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

const B = A.filter(x => x % 2 === 0);

const C = A.filter(function (x) {
    if (x % 2 === 0) {
        return true;
    } else {
        return false;
    }
});

console.log(B);
