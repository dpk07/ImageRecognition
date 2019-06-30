const express = require("express");
const app = express();
var server_port = process.env.OPENSHIFT_NODEJS_PORT || 8080;
var server_ip_address = process.env.OPENSHIFT_NODEJS_IP || "127.0.0.1";

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

app.listen(server_port, () =>
  console.log(`App listening on port ${server_port}!`)
);
