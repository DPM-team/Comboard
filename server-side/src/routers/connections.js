const express = require("express");
const User = require("../models/user.js");
const Data = require("../models/data.js");
const authentication = require("../middleware/authentication");
const authenticationOrg = require("../middleware/authenticationOrg");

const router = express.Router();

router.post("/api/user/requestConnection", authentication, authenticationOrg, async function (req, res) {
  try {
    const userFromRequest = req.user;
    const userToRequest = await User.findOne({ _id: req.query.userId });

    if (!userToRequest) {
      throw new Error();
    }

    const userFromRequestData = await Data.findOne({ userID: userFromRequest._id, organizationID: req.orgId });
    const userToRequestData = await Data.findOne({ userID: userToRequest._id, organizationID: req.orgId });

    if (!userFromRequestData.pendingRequestsSend.includes(userToRequest._id) && !userToRequestData.pendingRequestsReceive.includes(userFromRequest._id)) {
      userFromRequestData.pendingRequestsSend.push(userToRequest._id);
      userToRequestData.pendingRequestsReceive.push(userFromRequest._id);
    } else {
      userFromRequestData.pendingRequestsSend.remove(userToRequest._id);
      userToRequestData.pendingRequestsReceive.remove(userFromRequest._id);
    }

    await userFromRequestData.save();
    await userToRequestData.save();

    res.status(201).send();
  } catch (e) {
    console.log(e);
    res.status(400).send(e);
  }
});

module.exports = router;
