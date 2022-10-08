const path = require("path");
const http = require("http");
const express = require("express");
require("../database/mongoose");

const app = express();
//We use http module because in socket.io library, we need to pass as argument the HTTP server, but express alone, creates the server behind the scenes and we don't have access to the HTTP server
const server = http.createServer(app);

const publicDirPath = path.join(__filename, "../../../public");

app.use(express.static(publicDirPath));
app.use(express.json());

module.exports = server;
