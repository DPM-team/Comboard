const express = require("express");
const Team = require("../models/team.js");
const teamController = require("../controllers/teamController.js");
const multer = require("multer");
const authentication = require("../middleware/authentication.js");

const router = new express.Router();

// Router to get all the data of a specific team
router.get("/api/team/", teamController.getTeam);

// Router to create a new organization team
router.post("/api/team/create", teamController.createTeam);

router.put("/api/team/update", authentication, teamController.updateTeamData);

router.get("/api/team/members", teamController.getTeamMembers);

router.get("/api/team/projects", teamController.getTeamProjects);

router.get("/api/team/supervisor", teamController.getTeamSupervisor);

// Router to add a new project to the team the belongs
router.post("/api/team/project", teamController.addProjectToTeam);

const uploadUserProfile = multer({
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
  "/api/team/upload/photo",
  authentication,
  uploadUserProfile.single("upload"),
  async (req, res) => {
    const teamID = req.query.teamID;

    if (!teamID) {
      throw new Error();
    }

    const teamObj = await Team.findOne({ _id: teamID, supervisor: req.user._id }).select("image");

    if (!teamObj) {
      throw new Error();
    }

    console.log(req);

    // const buffer = await sharp(req.file.buffer)
    // .resize({
    //   width: 250,
    //   height: 250,
    // })
    // .png()
    // .toBuffer();

    teamObj.image = req.file.buffer;

    await teamObj.save();

    res.set("Content-Type", "image/png");

    res.status(200).send(teamObj.image);
  },
  (error, req, res, next) => {
    res.status(400).send({ error: error.message });
  }
);

module.exports = router;
