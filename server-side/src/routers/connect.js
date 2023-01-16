const express = require("express");
const path = require("path");
const generator = require("generate-password");
const User = require("../models/user");
const Email = require("../APIs/emails/email");
const sendEmail = require("../APIs/emails/send-email.js");
const authentication = require("../middleware/authentication");
const { use } = require("./error.js");

const router = new express.Router();

router.post("/api/register", async (req, res) => {
  const userObj = new User(req.body);

  try {
    await userObj.save();

    // sendEmail(new Email(userObj.email, "dpmcomboard@gmail.com", "TestSubject", "<h1>Test content</h1>"));
    const generatedToken = await userObj.generateAuthenticationToken();
    res.status(201).send({ userObj, generatedToken });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

//This is the router which runs when one user tries to login.User informaton will be sent back to client.
router.post("/api/login", async (req, res) => {
  try {
    const userObj = await User.checkCredentials(req.body.username, req.body.password);
    const generatedToken = await userObj.generateAuthenticationToken();
    res.status(200).send({ userObj, generatedToken });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

let generatedPassword = "";
let userAccount = null;

router.get("/retrieve-account/step-1", (req, res) => {
  res.sendFile(path.join(__dirname + "../../../views/forgot-password.html"));
});

router.post("/api/retrieve-account/step-1/submit", async (req, res) => {
  try {
    const email = req.body.email;
    userAccount = await User.findOne({ email });
    if (!userAccount) {
      throw new Error("No user with this email");
    }
    const subject = "Retrieve Account";
    generatedPassword = generator.generate({
      length: 10,
      numbers: true,
      symbols: true,
      strict: true,
    });
    const html = `<div>${generatedPassword}</div>`;
    const emailObj = new Email(email, "dpmcomboard@gmail.com", subject, html);
    sendEmail(emailObj);
    res.send();
  } catch (e) {
    res.status(400).send(e.message);
  }
});

router.post("/api/retrieve-account/step-2", async (req, res) => {
  try {
    const inputedPassword = req.body.password;

    if (inputedPassword !== generatedPassword) {
      throw new Error("Check your email again.");
    }
    res.send();
  } catch (e) {
    res.status(400).send(e);
  }
});

router.patch("/api/retrieve-account/step-3", async (req, res) => {
  try {
    const newPassword = req.body.password;
    await userAccount.populate("password");
  } catch (e) {
    res.status(400).send(e.message);
  }
});

module.exports = router;
