import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });


export const putDb = async (content) => {
  console.log('1. PUT route');
  // Opens the database
  const contentDb = await openDB('jate', 1);
  console.log('1', contentDb);
  // creates a transaction
  const tx = contentDb.transaction('jate', 'readwrite')
  // stores the transaction in objectStore
  const store = tx.objectStore('jate')
  // sets the key and content
  const request = store.put({ id: 1, content: content })
  // sets the result and calls it
  const result = await request
  console.log(result);
}

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
  // opens the database
  const contentDb = await openDB('jate', 1);
  // creates a transaction
  const tx = contentDb.transaction('jate', 'readonly')
  // stores the transaction in objectStore
  const store = tx.objectStore('jate')
  // gets all of the items in the objectStore
  const request = store.getAll()
  // sets the result
  const result = await request
  console.log(('result.value', result));
  // returns the result and items stored in objectStore
  return result?.value
}

initdb();
