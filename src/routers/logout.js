const express = require("");
const User = require("../models/user");
const authentication = require("../middleware/authentication");
const router = new express.Router();

//This is the router which runs when one user tries to logout from one device.
//Tokens will be added later on the user model.
router.post("/users/logout", auth, async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter((token) => {
      return token.token !== req.token;
    });
    await req.user.save();
    res.send();
  } catch (e) {
    res.status(500).send();
  }
});
