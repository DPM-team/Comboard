const express = require("express");
const Team = require("../models/team.js");
const teamController = require("../controllers/teamController.js");

const router = new express.Router();

// Router to get all the data of a specific team
router.get("/api/team/", teamController.getTeam);

// Router to create a new organization team
router.post("/api/team/create", teamController.createTeam);

router.get("/api/team/members", teamController.getTeamMembers);

router.get("/api/team/projects", teamController.getTeamProjects);

router.get("/api/team/supervisor", teamController.getTeamSupervisor);

// Router to add a new project to the team the belongs
router.post("/api/team/project", teamController.addProjectToTeam);

router.delete("/api/team/:identifier", teamController.deleteTeam);

module.exports = router;
