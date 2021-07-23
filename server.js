var express = require('express');
var app = express();
var fs = require("fs");
var bodyParser = require('body-parser');

// Fake in memory database with a default user
var users = ["Jamie"];

var urlencodedParser = bodyParser.urlencoded({ extended: false })
app.use(urlencodedParser);

app.use(express.static('public'));
app.use(bodyParser.json());

app.get('/', function (req, res) {
      res.sendFile( __dirname + "/" + "index.htm" );
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
app.post('/process_post', urlencodedParser, function (req, res) {
      console.log("POST request for /process_post");
      // Put the new user into the "database"
      users.push(req.body.firstname);

      // Create response
      response = {
         firstname:req.body.firstname,
         lastname:req.body.lastname
      };
      console.log("Added user " + req.body.firstname + " " + req.body.lastname);

      res.send(JSON.stringify(response));
})

// GET request for a user
app.get('/:id', function (req, res) {
   console.log("GET request for " + req.params.id + " - " + users[req.params.id]);
   res.send( JSON.stringify(users[req.params.id]));
})

// DELETE request for a user
app.delete('/deleteUser/:id', function (req, res) {
   res.status(403);
   res.end();
})

// SERVER INFO
var server = app.listen(8081, function () {
   var host = server.address().address;
   var port = server.address().port;
   console.log("Listening at http://%s:%s", host, port)
})