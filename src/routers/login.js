const express = require("");
const User = require("../models/user");
const authentication = require("../middleware/authentication");
const router = new express.Router();

//This is the router which runs when one user tries to login.User informaton will be sent back to client.
router.post("/users/login", async (req, res) => {
  try {
    const user = User.checkCredentials(req.body.username, req.body.password);
    res.send();
  } catch (e) {
    res.status(400).send();
  }
});
