// SERVER INFO
const app = require("./app");

let server = app.listen(process.env.PORT || 8081); // User Heroku's environment PORT or, if local, 8081