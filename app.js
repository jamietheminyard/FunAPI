let express = require('express');
let fs = require("fs");
let bodyParser = require('body-parser');
let db = require("./database.js");
let app = express();
let urlencodedParser = bodyParser.urlencoded({ extended: false });
const {v4, validate} = require('uuid');
const Order = require("./entities/Order");
//const cors = require("cors");

app.use(urlencodedParser);
app.use(express.static('public'));
app.use(bodyParser.json());
//app.use(cors());
app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

// GET request for /
app.get('/', function (req, res) {
    console.log("GET request for /");
    res.sendFile( __dirname + "/" + "AddOrder.html" );
})

// Gracefully handle requests for favicon.ico
app.get('/favicon.ico', function (req, res) {
})

// DELETE request for an order
app.delete('/:id', function (req, res) {
    console.log("DELETE request for " + req.params.id);
    res.status(403); // For testing purposes throw a 403 forbidden
    res.end();
})

// POST request to add a new order
app.post('/submit_order', urlencodedParser, function (req, res) {
    console.log("POST request for /submit_order");

    let newordernum = v4(); // UUID

    let data = {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        ordernum : newordernum
    }
    let sql ='INSERT INTO orders (firstname, lastname, ordernum) VALUES (?,?,?)'
    let params =[data.firstname, data.lastname, data.ordernum]
    db.query(sql, params, function (err, result) {
        if (err) {
            console.log("ERROR while adding an order for " + req.body.firstname + " " + req.body.lastname);
            res.status(400).json({ "error": err.message })
            return;
        }
        else{
            res.status(200).send(newordernum);
            console.log("Added order number " + newordernum + " for " + req.body.firstname + " " + req.body.lastname);
            return;
        }
    });
})

// GET request to list all orders
app.get('/listOrders', async function (req, res) {
    console.log("GET request for /listOrders");

    let sql = "select * from orders"
    let params = []
    db.query(sql, params, (err, rows) => {
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
app.get('/:id', async function (req, res) {
    console.log("GET request for order number " + req.params.id);

    // Ensure there's an order number passed in
    if (!req || !req.params || !req.params.id) {
        console.log("Param ID (order number) is missing from the request.");
        return res.status(400).json({"error": "Order number cannot be empty."});
    }

    // The parameter should be a UUID
    if (!validate(req.params.id, 4)) {
        console.log("Param ID (order number) failed validation. Not a valid UUID.");
        return res.status(400).json({"error": req.params.id + " is not a valid order number."});
    }

    let sql = "select * from orders" //<----- fix this, it's just selecting all for now
    let params = []
    db.query(sql, params, (err, rows) => {
        if (err) {
            res.status(400).json({"error":err.message});
            return;
        }
        res.json({
            "firstname":"Blah",
            "lastname":"Blabb",
            "data":rows
        })
    });

//    try {
//        const row = await Order.read(req.params.id);
//        res.json({
//            "message": "success",
//            "data": row
//        })
//    } catch (er) {
//        return res.status(404).json({"error": "Order " + req.params.id + " not found."});
//    }
})

module.exports = app;