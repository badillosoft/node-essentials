// ES6 - ECMA 2015

// Una promesa es un objeto que se resuelve o se rechaza
// en algún momento, puede ser inmediatamente o después de
// cierto tiempo.

// Las promesas sirven para crear cadenas asíncronas
// y normalizar los procesos.

// Ejemplo: Suponga que un código se manda a llamar y finaliza
// pasados 20 segundos. Suponga que queremos llamar tres veces el
// mismo código esperando cada vez que acabe el anterior, es decir,
// llamar una función asíncrona que dura 20 segundos tres veces
// hasta que termine.

function espera10s(callback) {
    setTimeout(() => {
        console.log("Finalizado", new Date());
        callback();
    }, 10000);
}

espera10s(() => {
    console.log("Ya pasaron 10 segundos");
});

// Ejemplo: Cada 5 segundos devolver un número aleatorio,
// hasta generar 10 número aleatorios

function generador(callback) {
    let c = 0;
    const siguiente = function () {
        if (c >= 10) {
            return;
        }
        c += 1;
        const n = Math.random() * 100;
        callback(n);
        setTimeout(() => {
            siguiente();
        }, 5000);
    };
    siguiente();
}

generador((n) => {
    console.log("n=", n);
});

// Promesas

function espera10sp() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log("Finalizó la promesa", new Date());
            resolve();
        }, 10000);
    });
}

espera10sp().catch((err) => {
    console.log("Algo salió mal", err);
}).then(() => {
    console.log("Todo salió bien y pasaron 10 segundos");
});

// espera10s y espera10sp

espera10s(() => {
    espera10s(() => {
        espera10s(() => {
            console.log("Ya pasaron 30 segundos");
        });
    });
});

espera10sp().then(() => {
    return espera10sp();
}).then(() => {
    return espera10sp();
}).then(() => {
    console.log("Ya pasaron 30 segundos con promesas");
});

// Ejemplo complejo usando promesas

// obtenerTiendasCoordenada(100, 50, 20).then(tiendas => {
//     tiendas.forEach(tienda => {
//         obtenerClientes(tienda).then(clientes => {
//             clientes.forEach(cliente => {
//                 enviarEmail(cliente, `Visita la tienda: ${tienda.nombre}`);
//             });
//         });
//     });
// });