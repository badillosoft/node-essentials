# Práctica III - MongoDB

<small>Alan Badillo Salas (badillo.soft@hotmail.com)</small>

Mongo DB es un motor de base de datos NO-SQL que consiste en almacenar documentos, los cuales a fines prácticos equivalen a almacenar un objeto *JSON* o un diccionario de *Javascrip*, los documentos representan la unidad atómica y deberían almacenar los datos de un solo individuo, producto, etc. Es decir, los documentos de mongo almacenan lo que equivale a un registro en una tabla SQL. Los documentos son organizados dentro de colecciones y debería poseer una estructura similar, por ejemplo, la colección productos, debería esperar que todos sus documentos contuvieran datos de un solo producto. El conjunto de colecciones se considera la base de datos.

## Iniciar el servidor

Si no puede ejecutar el comando `mongod` directamente de una terminal, deberá ejecutarlo manualmente de su ruta de instalación `C:/Archivos de Programa/mongodb/server/3.4/bin`.

> `$ mongod`

Podemos obtener la ruta de conexión con `$ mongo` debería ser similar a `mongodb://localhost:27017` al menos que se haya cambiado el puerto por defecto.

## Configurar el conector de MongoDB en NodeJS

> `$ npm install mongodb`

~~~js
const MongoClient = require("mongodb").MongoClient;

MongoClient.connect("mongodb://localhost:27017/mi_tienda", (err, db) => {
    if (err) {
        // No se pudo conectar
        return;
    }
    // db es la conexión
});
~~~

## Insertar un documento

~~~js
const data = {
    nombre: "Coca-Cola",
    descripcion: "Refresco de cola",
    costo: 1.2,
    existencias: 1000
};
db.collection("productos").insertOne(data, (err, result) => {
    if (err) {
        // Error en la transacción
        return;
    }
    // result constiene el resultado de la operación
});
~~~

## Buscar un documento

El `query` en la búsqueda de documentos contiene los campos que deberán cumplir ciertas condiciones, la más común es la condición de igualdad, por ejemplo, si tenemos el query:

~~~js
const query = {
    nombre: "Coca-Cola",
    bloqueado: false
};
~~~

El `query` anterior buscaría en la colección todos los documentos cuyo nombre es exactamente igual a `"Coca-Cola"` y cuyo campo `bloqueado` es exactamente `false`.

En mongo existen operadores de consulta, los cuales permiten hacer busquedas sobre los campos más sofisticadas, por ejemplo:

~~~js
const query = {
    existencias: { $gt: 100 }
};
~~~

El `query` anterior busca todos los documentos en la colección cuyo campo `existencias` es mayor estricto que `100`, si modificamos por `$gte` obtendremos los que son mayores o iguales a `100`. Otros operadores son `$lt` y `$lte` que representan menor estricto y menor o igual.

La lista completa de operadores puede ser consultada en https://docs.mongodb.com/manual/reference/operator/query/

Dos operadores principales son `$and` y `$or`, el operador `$and` funciona por defecto con todas las condiciones definidas en el `query`, pero si queremos que se cumpla una condición u otra, hacemos:

~~~js
const query = {
    $or: [
        {
            costo: { $gte: 10 }
        },
        {
            existencias: { $lte: 100 }
        }
    ]
};
~~~

Finalmente un operador especial llamado `$regex` nos permitirá evaluar expresiones regulares dentro de patrones de texto, por ejemplo, detectar todos los usuarios que poseen correo de `gmail`.

~~~js
const query = {
    email: { $regex: "gmail", $options: "i" }
};
~~~

El `query` anterior recupera todos los documentos que contienen en su campo email (de texto) la palabra `gmail`, el `$options: "i"` especifica que sea insensitivo a minúsculas y mayúsculas.

~~~js
// Todos los que empiezan con PA
const query = {
    nombre: { $regex: "^pa", $options: "i" }
}

// Todos los que terminan con CO
const query = {
    nombre: { $regex: "CO$", $options: "i" }
}

// Todos los que contenienen con NA
const query = {
    nombre: { $regex: "NA", $options: "i" }
}
~~~

Mongo nos permite enviar un objeto de proyección, para esconder campos, o mostrar solo los campos de interés, el `_id` siempre se muestra, a menos que se oculte manualmente

~~~js
const query = {
    email: "pepe@gmail.com"
};
// Oculta el _id y muestra solo los campos nombre, email
const proj = {
    _id: 0,
    nombre: 1,
    email: 1
};
db.collection("productos").findOne(query, proj, (err, result) => {
    if (err) {
        // Error en la transacción
        return;
    }
    // result constiene el resultado de la operación
});
~~~

Si queremos buscar toda una colección usamos `find` en lugar de `findOne` pero hay que tener cuidado ya que no hay callback.

~~~js
const query = {
    descripcion: { $regex: "refresco", $options: "i" }
};
db.collection("productos").find(query).toArray((err, productos) => {
    if (err) {
        // Falló la consulta
        return;
    }
    // productos es un arreglo de diccionarios
});
~~~

## Paginar las búsquedas

Para paginar, necesitamos omitir de la búsqueda todos los resultados que se supone ya se vieron de las páginas anteriores y solo mostrar la última página.

~~~js
const query = {
    descripcion: { $regex: "refresco", $options: "i" }
};
db.collection("productos").find(query).skip(100).limit(20).toArray((err, productos) => {
    if (err) {
        // Falló la consulta
        return;
    }
    // productos es un arreglo de diccionarios
});
~~~

Si `N` es el número de página y `M` el tamaño de página (en el caso anterior) omitimos las primeras `5` páginas de tamaño `20`. Contando las páginas desde la 0, la página 5 sería la sexta (0, 1, 2, 3, 4, 5).

~~~js
const N = 5;
const M = 20;
db.collection("productos").find(query)
    .skip(N * M).limit(M)
    .toArray(...);
~~~

## Actualizar un documento

Para actualizar definimos un `query` el cual va a definir que elementos deben actualizarse, luego podemos usar `updateOne` para actualizar solo uno, que es lo recomendable para evitar problemas. El operador `$set` nos permite ajustar todos los campos del documento a sus nuevos valores, si no existían los crea y sino lo reemplaza, para eliminar campos revisa el operador `$unset`.

> Agregar un campo que no existia

~~~js
const query = {
    email: "pepe@gmail.com"
};
db.collecion("usuarios").updateOne(query, {
    $set: {
        avatar: "http://placehold.it/300x300"
    }
}, (err, result) => {
    ...
});
~~~

## Eliminar un documento

~~~js
const query = {
    email: "pepe@gmail.com"
};
db.collection("usuarios").removeOne(query, (err, result) => {
    ...
});
~~~

## Definir un archivo que provea las funciones de la base de datos

Vamos a crear un módulo `storage.js` que contenga funciones útiles que operen directamente la base de datos y su conexión, de forma que sea fácil de utilizar del otro lado.

~~~js
return new Promise((resolve, reject) => {
});
~~~

~~~js
const { MongoClient } = require("mongodb");

function connect(host, dbname) {
    return new Promise((resolve, reject) => {
        MongoClient.connect(`mongodb://${host}/${dbname}`, (err, db) => {
            if (err) {
                reject(err);
                return;
            }
            resolve(db);
        });
    });
}

function showAll(collname, numPage = 0, sizePage = 100) {
    return new Promise((resolve, reject) => {
        db.collection(collname).find({})
            .skip(numPage * sizePage)
            .limit(sizePage)
            .toArray((err, data) => {
                if (err) {
                    reject(err);
                    return;
                }
                resolve(data);
            });
    });
}

function insertOne(collname, data) {
    return new Promise((resolve, reject) => {
        db.collection(collname).insertOne(data, (err, result) => {
            if (err) {
                reject(err);
                return;
            }
            resolve(result);
        });
    });
}

function showProducts(numPage = 0, sizePage = 100) {
    return showAll("products", numPage, sizePage);
}

function showUsers(numPage = 0, sizePage = 100) {
    return showAll("users", numPage, sizePage);
}

function showPartners(numPage = 0, sizePage = 100) {
    return showAll("partners", numPage, sizePage);
}

function insertProduct(name, description, cost, availability) {
    return insertOne("products", {
        name,
        description,
        cost,
        availability
    });
}

module.exports = {
    connect,
    showProducts,
    showUsers,
    showPartners,
    insertProduct
};
~~~

## Problemas

* Pendientes.