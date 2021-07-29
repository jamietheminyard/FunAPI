let express = require('express'); // don't use var, use let. requires all at the top
let fs = require("fs");
let bodyParser = require('body-parser');
let app = express();
const {v4} = require('uuid');

// Fake in memory database with a default user
let users = ["Jamie"];

let urlencodedParser = bodyParser.urlencoded({ extended: false })
app.use(urlencodedParser);

app.use(express.static('public'));
app.use(bodyParser.json());

app.get('/', function (req, res) {
    res.sendFile( __dirname + "/" + "AddOrder.html" );
})

// GET request to list all users
app.get('/listUsers', function (req, res) {
    console.log("GET request for /listUsers");

    for (let i = 0; i < users.length; i++){
        console.log("  User " + i + " - " + users[i]);
    }
    res.send(JSON.stringify(users));
})

// POST request to add a new user
app.post('/submit_order', urlencodedParser, function (req, res) {
    console.log("POST request for /submit_order");
    // Put the new user into the "database"
    users.push(req.body.firstname);

    // Create response
    let ordernum = v4(); // UUID
    response = {
        ordernum:ordernum
    };
    console.log("Added order for " + req.body.firstname + " with order number " + ordernum);

    //res.send(JSON.stringify(response));
    res.send(ordernum);
})

// GET request for a user
app.get('/:id', function (req, res) {
    console.log("GET request for " + req.params.id + " - " + users[req.params.id]);
    res.send( JSON.stringify(users[req.params.id]));
})

// DELETE request for a user
app.delete('/:id', function (req, res) {
    res.status(403); // For testing purposes throw a 403 forbidden
    res.end();
})

module.exports = app;