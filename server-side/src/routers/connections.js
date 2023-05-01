const express = require("express");
const Data = require("../models/data.js");
const { toogleConnection, recommentedConnections, answerRequestConnection } = require("../controllers/connectionController.js");
const authentication = require("../middleware/authentication");

const router = express.Router();

router.put("/api/user/requestConnection", authentication, toogleConnection);

router.get("/api/organization/recommentedConnections", authentication, recommentedConnections);

router.put("/api/organization/user/:userRequestConnectionID/connection", authentication, answerRequestConnection);

module.exports = router;
