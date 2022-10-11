const express = require("express");
const User = require("../models/user");
const authentication = require("../middleware/authentication");
const router = new express.Router();

//This is the router which runs when one user tries to login.User informaton will be sent back to client.
router.post("/users/login", async (req, res) => {
  try {
    const user = await User.checkCredentials(req.body.username, req.body.password);
    const generateToken = user.generateAuthenticationToken();
    res.send();
  } catch (e) {
    res.status(400).send(e);
  }
});

module.exports = router;
