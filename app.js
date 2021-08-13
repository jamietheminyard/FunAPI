let express = require('express'); // don't use var, use let. requires all at the top
let fs = require("fs");
let bodyParser = require('body-parser');
let db = require("./database.js");
const {v4} = require('uuid');

let app = express();
let urlencodedParser = bodyParser.urlencoded({ extended: false })
app.use(urlencodedParser);
app.use(express.static('public'));
app.use(bodyParser.json());

// GET request for /
app.get('/', function (req, res) {
    res.sendFile( __dirname + "/" + "AddOrder.html" );
})

// DELETE request for an order
app.delete('/:id', function (req, res) {
    res.status(403); // For testing purposes throw a 403 forbidden
    res.end();
})

// POST request to add a new order
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

    let sql = "select * from orders"
    let params = []
    db.all(sql, params, (err, rows) => {
        if (err) {
            res.status(400).json({"error":err.message});
            return;
        }
        res.json({
            "message":"success",
            "data":rows
        })
    });
})

// GET request for an order
app.get('/:id', function (req, res) {
    console.log("GET request for " + req.params.id + " - " + orders[req.params.id]);
    res.setHeader('Content-Type', 'application/json');
    res.send( JSON.stringify(orders[req.params.id]));
})

module.exports = app;