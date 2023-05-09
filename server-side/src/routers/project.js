const express = require("express");
const projectController = require("../controllers/projectController.js");
const authentication = require("../middleware/authentication");

const router = new express.Router();

router.post("/api/project/create", projectController.createProject);

router.get("/api/project", authentication, projectController.getProject);

module.exports = router;
