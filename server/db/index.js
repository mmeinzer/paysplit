const db = require('knex')({
  client: 'sqlite3',
  connection: {
    filename: './db/database.db'
  },
  useNullAsDefault: true
});

module.exports = db;
