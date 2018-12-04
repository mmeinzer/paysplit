CREATE TABLE IF NOT EXISTS person (
  _id INTEGER PRIMARY KEY,
  handle TEXT
);

CREATE TABLE IF NOT EXISTS purchase (
  _id INTEGER PRIMARY KEY,
  purchaser INTEGER,
  amount REAL,
  description TEXT,
  FOREIGN KEY(purchaser) REFERENCES person(id)
);

CREATE TABLE IF NOT EXISTS recipient (
  _id INTEGER PRIMARY KEY,
  person_id INTEGER,
  purchase_id INTEGER,
  FOREIGN KEY(person_id) REFERENCES person(id),
  FOREIGN KEY(purchase_id) REFERENCES purchase(id)
);
