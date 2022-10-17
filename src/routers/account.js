const express = require("express");
const path = require("path");
const User = require("../models/user.js");
const Email = require("../APIs/emails/email");
const sendEmail = require("../APIs/emails/send-email.js");
const { Profile } = require("../models/profile.js");
const { Account } = require("../models/account.js");

const router = new express.Router();

router.get("/register", function (req, res) {
  res.sendFile(path.join(__dirname + "./../../public/views/register.html"));
});

router.post("/register/submit", async function (req, res) {
  const profileObj = new Profile({ name: req.body.firstname, surname: req.body.surname });
  const accountObj = new Account({ username: req.body.username, email: req.body.email, password: req.body.password });
  const userObj = new User({ account: accountObj._id, profile: profileObj._id });
  try {
    await accountObj.save();
    await profileObj.save();
    await userObj.save();

    // sendEmail(new Email(userObj.email, "dpmcomboard@gmail.com", "TestSubject", "<h1>Test content</h1>"));
    // const token = await userObj.generateAuthenticationToken();
    res.status(201).send({ userObj });
  } catch (error) {
    res.status(400).send(error.message);
  }
});

module.exports = router;
