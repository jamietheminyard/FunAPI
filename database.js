const { Client } = require('pg');

let dbString = 'postgres://syjhlypnkldomc:f3779cfc60be2ed475f58323b3ab06ecfbc5d3b550323159275b62fdc4156149@ec2-34-233-105-94.compute-1.amazonaws.com:5432/db7cfi30u0pl4g';

const db = new Client({
    connectionString: process.env.DATABASE_URL || dbString,
    ssl: {
        rejectUnauthorized: false
    }
});

console.log('Connecting to the Postgres database at ' + dbString);

db.connect();

db.query('SELECT * FROM orders limit 10;', (err, res) => {
    if (err) throw err;
    for (let row of res.rows) {
        console.log(JSON.stringify(row));
    }
//    db.end();
});

console.log('Connected to the Postgres database.');

module.exports = db;