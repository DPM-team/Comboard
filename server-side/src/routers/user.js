const express = require("express");
const User = require("../models/user.js");
const Organization = require("../models/organization.js");
const userController = require("../controllers/userController.js");

const router = express.Router();

router.get("/api/user/organizations", async function (req, res) {
  try {
    const userID = req.query.userID;

    const userObj = await User.findById(userID).populate("organizations");

    if (!userObj) {
      return res.status(200).json({ error: "User not found" });
    }

    res.status(200).json({ organizations: userObj.organizations });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

// Router to add a new team to the user the belongs
router.post("/api/user/team", userController.addTeamToUser);

module.exports = router;
