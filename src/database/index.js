const { Client } = require('pg');

const client = new Client({
  host: 'localhost',
  port: 5432,
  user: 'root',
  password: 'root',
  database: 'mycontacts',
});

client.connect();

async function Query(query) {
  const { rows } = await client.query(query);
  return rows;
}

Query('SELECT * FROM contacts').then(console.log);
