// quite untested, adapted from BigstickCarpet's gist, attempt to make it simpler to use
const dbVersion = 1;
const dbName = 'RecordVideos';

function openIndexedDB(fileindex) {
  // This works on all devices/browsers, and uses IndexedDBShim as a final fallback
  const indexedDB =
    window.indexedDB ||
    window.mozIndexedDB ||
    window.webkitIndexedDB ||
    window.msIndexedDB ||
    window.shimIndexedDB;

  const openDB = indexedDB.open(dbName, dbVersion);

  openDB.onupgradeneeded = () => {
    const db = {};
    db.result = openDB.result;
    db.store = db.result.createObjectStore(dbName, { keyPath: 'id' });
    if (fileindex) db.index = db.store.createIndex('NameIndex', fileindex);
  };

  return openDB;
}

function getStoreIndexedDB(openDB) {
  const db = {};
  db.result = openDB.result;
  db.tx = db.result.transaction(dbName, 'readwrite');
  db.store = db.tx.objectStore(dbName);
  db.index = db.store.index('NameIndex');

  return db;
}

export function saveIndexedDB(filename, filedata, fileindex, callback) {
  const openDB = openIndexedDB(fileindex);

  openDB.onsuccess = () => {
    const db = getStoreIndexedDB(openDB);
    db.store.put({ id: filename, data: filedata });
    callback();
  };

  return true;
}

export function findIndexedDB(filesearch, callback) {
  return loadIndexedDB(null, callback, filesearch);
}

export function loadIndexedDB(filename, callback, filesearch) {
  if (!filename) return;
  const openDB = openIndexedDB();
  openDB.onsuccess = () => {
    const db = getStoreIndexedDB(openDB);
    let getData;

    if (filename) {
      getData = db.store.get(filename);
    } else {
      getData = db.index.get(filesearch);
    }

    getData.onsuccess = () => {
      callback(getData.result.data);
    };

    db.tx.oncomplete = () => {
      db.result.close();
    };
  };

  return true;
}
