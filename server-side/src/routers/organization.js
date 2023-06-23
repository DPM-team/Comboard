const express = require("express");
const authentication = require("../middleware/authentication.js");
const organizationController = require("../controllers/organizationController"); // Import the organization controller
const multer = require("multer");
const Organization = require("../models/organization.js");
const sharp = require("sharp");

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

const uploadOrganizationPhoto = multer({
  limits: {
    fileSize: 1000000,
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(png|jpeg|svg)$/)) {
      return cb(new Error("The type of file is not correct."));
    }

    cb(undefined, true);
  },
});

router.put(
  "/api/organization/upload/photo",
  authentication,
  uploadOrganizationPhoto.single("upload"),
  async (req, res) => {
    const organizationID = req.query.organizationID;
    if (!organizationID) {
      throw new Error("Organization ID is required");
    }

    const organization = await Organization.findById(organizationID).select("creator image");
    if (!organization) {
      throw new Error();
    }

    if (organization.creator.toString() !== req.user._id.toString()) {
      throw new Error();
    }

    const buffer = await sharp(req.file.buffer)
      .resize({
        width: 250,
        height: 250,
      })
      .png()
      .toBuffer();
    organization.image = buffer;
    await organization.save();
    res.set("Content-Type", "image/png");
    res.send(organization.image);
  },
  (error, req, res, next) => {
    console.log(error);
    res.status(400).send({ error: error.message });
  }
);

router.put(
  "/api/organization/upload/banner",
  authentication,
  uploadOrganizationPhoto.single("upload"),
  async (req, res) => {
    const organizationID = req.query.organizationID;
    if (!organizationID) {
      throw new Error("Organization ID is required");
    }

    const organization = await Organization.findById(organizationID).select("creator banner");
    if (!organization) {
      throw new Error();
    }

    if (organization.creator.toString() !== req.user._id.toString()) {
      throw new Error();
    }

    const buffer = await sharp(req.file.buffer).png().toBuffer();
    organization.banner = buffer;
    await organization.save();
    res.set("Content-Type", "image/png");
    res.send(organization.banner);
  },
  (error, req, res, next) => {
    res.status(400).send({ error: error.message });
  }
);

router.get(
  "/api/organization/banner",
  authentication,
  async (req, res) => {
    const organizationID = req.query.organizationID;
    if (!organizationID) {
      throw new Error("Organization ID is required");
    }

    const organization = await Organization.findById(organizationID).select("banner");
    if (!organization) {
      throw new Error();
    }

    res.set("Content-Type", "image/png");
    res.send(organization.banner);
  },
  (error, req, res, next) => {
    res.status(400).send({ error: error.message });
  }
);

router.get(
  "/api/organization/image",
  authentication,
  async (req, res) => {
    const organizationID = req.query.organizationID;
    if (!organizationID) {
      throw new Error("Organization ID is required");
    }

    const organization = await Organization.findById(organizationID).select("creator image");
    if (!organization) {
      throw new Error();
    }

    res.set("Content-Type", "image/png");
    res.send(organization.image);
  },
  (error, req, res, next) => {
    res.status(400).send({ error: error.message });
  }
);

// Router to get all the projects of an organization
router.get("/api/organization/projects", organizationController.getOrganizationProjects);

//Router to get all the stored organizations
router.get("/api/organizations", organizationController.getAllStoredOrganizations);

// Router to add a new team to the organization the belongs
router.post("/api/organization/team", organizationController.addTeamToOrganization);

// Router to get a specific organization based of its ID
router.get("/api/organization/:identifier", organizationController.getOrganizationByID);

router.post("/api/organization/invite", authentication, organizationController.sendJoinInvitation);

module.exports = router;
