const express = require("express");
const authentication = require("../middleware/authentication.js");
const organizationController = require("../controllers/organizationController"); // Import the organization controller

const router = express.Router();

// Router to create a new organization
router.post("/api/organization", organizationController.createOrganization);

router.get("/api/organization/data", authentication, organizationController.getOrganizationPublicData);

// Router to a user can join organization
router.post("/api/organization/join", organizationController.joinOrganization);

router.get("/api/organization/posts", authentication, organizationController.getOrganizationGlobalPosts);

// Router for /api/organization/members
router.get("/api/organization/members", organizationController.getOrganizationMembers);

// Router for /api/organization/teams
router.get("/api/organization/teams", organizationController.getOrganizationTeams);

// Router to get all the projects of an organization
router.get("/api/organization/projects", organizationController.getOrganizationProjects);

//Router to get all the stored organizations
router.get("/api/organizations", organizationController.getAllStoredOrganizations);

// Router to add a new team to the organization the belongs
router.post("/api/organization/team", organizationController.addTeamToOrganization);

// Router to get a specific organization based of its ID
router.get("/api/organization/:identifier", organizationController.getOrganizationByID);

module.exports = router;
