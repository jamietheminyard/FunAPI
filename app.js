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

    let newordernum = v4(); // UUID

    let data = {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        ordernum : newordernum
    }
    let sql ='INSERT INTO orders (firstname, lastname, ordernum) VALUES (?,?,?)'
    let params =[data.firstname, data.lastname, data.ordernum]
    db.run(sql, params, function (err, result) {
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
    console.log("GET request for order number " + req.params.id);

    let sql = "select * from orders where ordernum = ?"
    let params = [req.params.id]
    db.get(sql, params, (err, row) => {
        if (err) {
            res.status(400).json({"error":err.message});
            return;
        }
        res.json({
            "message":"success",
            "data":row
        })
    });
})

module.exports = app;