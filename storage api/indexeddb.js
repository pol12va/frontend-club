var todoDb = (function() {
    var tDB = {},
        datastore = null;

    tDB.open = function(callback) {
        var verion = 1,
            request = indexeddb.open('todos', version);

        request.onupgradeneeded = function(e) {
            var db = e.target.result,
                store;

            e.target.transaction.onerror = tDB.onerror;

            if (db.objectStoreNames.contains('todo')) {
                db.deleteObjectStore('todo');
            }

            store = db.createObjectStore('todo', {
                keyPath : 'timestamp'
            });
        };

        request.onsuccess = function(e) {
            datastore = e.target.result;

            callback();
        };

        request.onerror = tDB.onerror;
    };

    tDB.fetchTodos = function(callback) {
        var db = datastore,
            transaction = db.transaction(['todo'], 'readwrite'),
            objStore = transaction.objectStore('todo'),
            keyRange = IDBKeyRange.lowerBound(0),
            cursorRequest = objStore.openCursor(keyRange),
            todos = [];

        transaction.oncomplete = function(e) {
            callback(todos);
        };

        cursorRequest.onsuccess = function(e) {
            var result = e.target.result;

            if (!!result === false) {
                return;
            }

            todos.push(result.value);

            result.continue();
        };

        cursorRequest.onerror = tDB.onerror;
    };

    return tDB;
}());