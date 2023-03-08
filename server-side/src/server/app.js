const express = require("express");
require("../database/mongoose");
const http = require("http");
const bodyParser = require("body-parser");

const app = express();
//We use http module because in socket.io library, we need to pass as argument the HTTP server, but express alone, creates the server behind the scenes and we don't have access to the HTTP server
const server = http.createServer(app);

app.use(express.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());
//Config the routers
app.use(require("../routers/connect.js"));
app.use(require("../routers/logout.js"));
app.use(require("../routers/upload.js"));
app.use(require("../routers/error.js"));
app.use(require("../routers/project.js"));

module.exports = server;
