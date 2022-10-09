const express = require("express");
const path = require("path");
const User = require("../models/user.js");
const Email = require("../APIs/emails/email");
const sendEmail = require("../APIs/emails/send-email.js");
const { Profile } = require("../models/profile.js");
const { Password } = require("../models/password.js");
const { Account } = require("../models/account.js");

const router = new express.Router();

router.get("/register", function (req, res) {
  res.sendFile(path.join(__dirname + "./../../public/views/register.html"));
});

router.post("/register/submit", async function (req, res) {
  const profileObj = new Profile({ name: req.body.firstname, surname: req.body.surname });
  const passwordObj = new Password({ password: req.body.password });
  const accountObj = new Account({ username: req.body.username, email: req.body.email, password: passwordObj });
  const userObj = new User({ account: accountObj, profile: profileObj });

  try {
    await userObj.save();
    // sendEmail(new Email(userObj.email, "dpmcomboard@gmail.com", "TestSubject", "<h1>Test content</h1>"));
    // const token = await userObj.generateAuthenticationToken();
    res.status(201).send({ userObj, token });
  } catch (error) {
    res.status(400).send(error);
  }
});

module.exports = router;
