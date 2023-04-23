const express = require("express");
const tasksController = require("../controllers/tasksController.js");
const authentication = require("../middleware/authentication.js");

const router = express.Router();

router.post("/api/taskboard", authentication, tasksController.createTaskBoard);

module.exports = router;
