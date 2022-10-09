const express = require("express");
const path = require("path");
const User = require("../models/user.js");
const Email = require("../APIs/emails/email");
const sendEmail = require("../APIs/emails/send-email.js");

const router = new express.Router();

router.get("/account/register", function (req, res) {
  res.sendFile(path.join(__dirname + "./../../public/views/register.html"));
});

router.get("/account/register/submit", async function (req, res) {
  const user = new User(req.body);

  try {
    await user.save();
    sendEmail(new Email(user.email, "dpmcomboard@gmail.com", "TestSubject", "<h1>Test content</h1>"));
    const token = await user.generateAuthenticationToken();
    res.status(201).send({ user, token });
  } catch (error) {
    res.status(400).send(error);
  }
});

module.exports = router;
