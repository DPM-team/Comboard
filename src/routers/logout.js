const express = require("express");
const User = require("../models/user");
const authentication = require("../middleware/authentication");

const router = new express.Router();

//This is the router which runs when one user tries to logout from one device.
router.post("/users/logout", authentication, async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter((token) => {
      return token.generatedToken !== req.token;
    });
    await req.user.save();
    res.send();
  } catch (e) {
    res.status(500).send();
  }
});

//This is the router which runs when one user tries to logout from all devices.
router.post("/users/logoutAll", authentication, async (req, res) => {
  try {
    req.user.tokens = [];
    await req.user.save();
    res.send();
  } catch (e) {
    res.status(500).send();
  }
});

module.exports = router;
