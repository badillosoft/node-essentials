function ordenarAsc(arreglo) {
    // sort ordena un arreglo bajo una función que compara
    // dos elementos (a, b) y devuelve un positivo si a > b,
    // un negativo si a < b o cero si a === b
    return arreglo.sort((a, b) => a - b);
}

module.exports = ordenarAsc;