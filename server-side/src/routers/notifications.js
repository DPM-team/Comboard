const express = require("express");
const authentication = require("../middleware/authentication");
const Data = require("../models/data");

const router = new express.Router();

//This is the router which runs when one user tries to logout from one device.
router.get("/api/user/organization/notifications", authentication, async (req, res) => {
  try {
    const userOrgData = await Data.findOne({ userID: req.user._id, orgID: req.query.orgID });

    if (!userOrgData) {
      throw new Error();
    }

    const notifications = await userOrgData.populate({ path: "notifications", model: "notification" });

    res.status(200).send({ message: "Correct load of notifications!", notifications });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

module.exports = router;
