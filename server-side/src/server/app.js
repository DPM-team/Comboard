const path = require("path");
const http = require("http");
const express = require("express");
const bodyParser = require("body-parser");
require("../database/mongoose");

const app = express();
//We use http module because in socket.io library, we need to pass as argument the HTTP server, but express alone, creates the server behind the scenes and we don't have access to the HTTP server
const server = http.createServer(app);

const publicDirPath = path.join(__filename, "../../../public");

app.use("/public", express.static(publicDirPath));
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());

//Config the routers
app.use(require("../routers/pages"));
app.use(require("../routers/connect"));
app.use(require("../routers/logout"));
app.use(require("../routers/error"));

module.exports = server;