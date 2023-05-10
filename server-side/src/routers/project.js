const express = require("express");
const projectController = require("../controllers/projectController.js");
const authentication = require("../middleware/authentication");

const router = new express.Router();

router.post("/api/project/create", projectController.createProject);

router.get("/api/project", authentication, projectController.getProject);

router.get("/api/project/members", authentication, projectController.getProjectMembers);

router.get("/api/project/supervisor", authentication, projectController.getProjectSupervisor);

module.exports = router;
