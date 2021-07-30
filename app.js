let express = require('express'); // don't use var, use let. requires all at the top
let fs = require("fs");
let bodyParser = require('body-parser');
let app = express();
const {v4} = require('uuid');

// Fake in memory database with a default order
let orders = ["4d2a4b38-f167-11eb-9a03-0242ac130003"];

let urlencodedParser = bodyParser.urlencoded({ extended: false })
app.use(urlencodedParser);

app.use(express.static('public'));
app.use(bodyParser.json());

app.get('/', function (req, res) {
    res.sendFile( __dirname + "/" + "AddOrder.html" );
})

// DELETE request for a user
app.delete('/:id', function (req, res) {
    res.status(403); // For testing purposes throw a 403 forbidden
    res.end();
})

// POST request to add a new user
app.post('/submit_order', urlencodedParser, function (req, res) {
    console.log("POST request for /submit_order");

    let ordernum = v4(); // UUID

    // Put the new order into the "database"
    orders.push(ordernum);
    response = {
        ordernum:ordernum
    };
    console.log("Added order for " + req.body.firstname + " with order number " + ordernum);

    //res.send(JSON.stringify(response));
    res.send(ordernum);
})

// GET request to list all orders
app.get('/listOrders', function (req, res) {
    console.log("GET request for /listOrders");

    for (let i = 0; i < orders.length; i++){
        console.log("  Order " + i + " - " + orders[i]);
    }
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(orders));
})

// GET request for an order
app.get('/:id', function (req, res) {
    console.log("GET request for " + req.params.id + " - " + orders[req.params.id]);
    res.setHeader('Content-Type', 'application/json');
    res.send( JSON.stringify(orders[req.params.id]));
})

module.exports = app;