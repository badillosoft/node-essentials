function getIds(callback) {
    const cur = db.collection("usuarios").find({});

    const docs = [];

    while(cur.hasNext()) {
        let count = 0;
        while (count < 20) {
            docs.push(cur.next());
            count++;
        }

        // Primeros 20
        callback(docs);
    }
}

// Paginación en mongo: https://scalegrid.io/blog/fast-paging-with-mongodb/