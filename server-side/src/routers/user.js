const express = require("express");
const userController = require("../controllers/userController.js");

const router = express.Router();

// Router to get all the organizations that a user is member
router.get("/api/user/organizations", userController.getUserOrganizations);

// Router to get all the teams that a user is member
router.get("/api/user/teams", userController.getUserTeams);

// Router to get all the projects that a user is member
router.get("/api/user/projects", userController.getUserProjects);

// Router to add a new team to the user the belongs
router.post("/api/user/team", userController.addTeamToUser);

// Router to add a new project to the user the belongs
router.post("/api/user/project", userController.addProjectToUser);

module.exports = router;
