const express = require("express");
const app = express();
const port = 3000;
const bodyParser = require("body-parser");
const routes = require("./routes");
var cors = require("cors");

//setup cors for cross origin resource sharing
// app.use(cors);

//setup static directory
app.use(express.static(__dirname + "/public"));

//setup routes
app.use(routes);

//setup body parser to parse request body
app.use(bodyParser.json());

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
