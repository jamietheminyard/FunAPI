const { Client } = require('pg');

// To connect from your local machine to the Heroku Postgres database
// This value is updated by Heroku. If it fails to connect, get the updated value from heroku config -a fun-api
let dbString = 'postgres://syjhlypnkldomc:f3779cfc60be2ed475f58323b3ab06ecfbc5d3b550323159275b62fdc4156149@ec2-34-233-105-94.compute-1.amazonaws.com:5432/db7cfi30u0pl4g';

const db = new Client({
    connectionString: process.env.DATABASE_URL || dbString, // Use the Heroku DATABASE_URL or, if local, dbString
    ssl: {
        rejectUnauthorized: false
    }
});

console.log('Connecting to the Postgres database at ' + dbString);
db.connect();
console.log('Connected to the Postgres database.');

module.exports = db;