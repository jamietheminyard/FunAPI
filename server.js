// SERVER INFO
const app = require("./app");

let server = app.listen(8081, function () {
   let host = server.address().address;
   let port = server.address().port;
   console.log("Listening at http://%s:%s", host, port)
})