function obtenerAleatorio() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(7);
        }, 10000);
    });
}

obtenerAleatorio().then(n => {
    console.log(`Tu número es ${n}`);
}).catch(err => {
    console.log(`Error ${err}`);
});