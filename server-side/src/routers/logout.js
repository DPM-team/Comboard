const express = require("express");
const User = require("../models/user");
const authentication = require("../middleware/authentication");

const router = new express.Router();

//This is the router which runs when one user tries to logout from one device.
router.post("/api/logout", authentication, async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter((tokenObj) => {
      return tokenObj.token !== req.token;
    });
    await req.user.save();
    res.status(200).send({ message: "You have logged out!!!" });
  } catch (error) {
    res.status(500).send(error);
  }
});

//This is the router which runs when one user tries to logout from all devices.
router.post("/api/logoutAll", authentication, async (req, res) => {
  try {
    req.user.tokens = [];
    await req.user.save();
    res.status(200).send({ message: "You have logged out from all devices!!!" });
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
