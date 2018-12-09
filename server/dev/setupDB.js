const db = require('../db');
const data = require('./data.js');

const tables = [
  {
    name: 'person',
    schema: `CREATE TABLE IF NOT EXISTS person (
    _id INTEGER PRIMARY KEY,
    handle TEXT
  );`
  },
  {
    name: 'purchase',
    schema: `CREATE TABLE IF NOT EXISTS purchase (
    _id INTEGER PRIMARY KEY,
    purchaser INTEGER,
    amount REAL,
    description TEXT,
    FOREIGN KEY(purchaser) REFERENCES person(id)
    );`
  },
  {
    name: 'recipient',
    schema: `CREATE TABLE IF NOT EXISTS recipient (
      _id INTEGER PRIMARY KEY,
      person_id INTEGER,
      purchase_id INTEGER,
      FOREIGN KEY(person_id) REFERENCES person(id),
      FOREIGN KEY(purchase_id) REFERENCES purchase(id)
      );`
  }
];

const ids = data.reduce((set, event) => {
  set.add(event.purchaser);
  event.recips.forEach(id => set.add(id));
  return set;
}, new Set());

// Drop tables if they exist and create new, empty ones
(async () => {
  Promise.all(
    tables.map(async table => {
      await db.schema.hasTable(table.name).then(exists => {
        if (exists) {
          db.schema
            .dropTable(table.name)
            .then(res => console.log(`Dropped table: ${table.name}`));
        }
      });
      await db.schema
        .raw(table.schema)
        .then(res => console.log(`Created table: ${table.name}`));
    })
  ).then(_ => {
    console.log('Adding data sample data...');
    ids.forEach(async id => {
      await db('person').insert({
        handle: `User_${id}`
      });
    });

    data.forEach(async ({ description, purchaser, amount, recips }) => {
      try {
        const res = await db('purchase').insert({
          purchaser,
          description,
          amount
        });
        recips.forEach(id => {
          db('recipient')
            .insert({
              person_id: id,
              purchase_id: res[0]
            })
            .then(() =>
              console.log(`Added\nRecipient: ${id}\nPurchase: ${res[0]}\n----`)
            );
        });
      } catch (e) {
        console.error(e);
      }
    });
  });
})();
