let sqlite3 = require('sqlite3').verbose()
const {v4} = require('uuid');

const DBSOURCE = "db.sqlite"

let db = new sqlite3.Database(DBSOURCE, (err) => {
    if (err) {
        // Cannot open database
        console.error(err.message)
        throw err
    }else{
        console.log('Connected to the SQLite database.')
        db.run(`CREATE TABLE orders (
            firstname text, 
            lastname text,
            ordernum text
            )`,
            (err) => {
                if (err) {
                    // Table already created
                }else{
                    // Table just created, creating some rows
                    var insert = 'INSERT INTO orders (firstname, lastname, ordernum) VALUES (?,?,?)'
                    db.run(insert, ["Jamie","Minyard",v4()])
                }
            });
    }
});


module.exports = db;