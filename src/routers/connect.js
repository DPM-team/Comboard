const express = require("express");
const path = require("path");
const generator = require("generate-password");
const User = require("../models/user.js");
const Email = require("../APIs/emails/email");
const sendEmail = require("../APIs/emails/send-email.js");
const authentication = require("../middleware/authentication");

const router = new express.Router();

router.get("/register", function (req, res) {
  res.sendFile(path.join(__dirname + "../../../views/register.html"));
});

router.post("/register/submit", async function (req, res) {
  const userObj = new User({ username: req.body.username, email: req.body.email, password: req.body.password, name: req.body.firstname, surname: req.body.surname });
  try {
    await userObj.save();

    // sendEmail(new Email(userObj.email, "dpmcomboard@gmail.com", "TestSubject", "<h1>Test content</h1>"));
    // const token = await userObj.generateAuthenticationToken();
    res.status(201).send({ userObj });
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.get("/login", async (req, res) => {
  res.sendFile(path.join(__dirname + "../../../views/login.html"));
});

//This is the router which runs when one user tries to login.User informaton will be sent back to client.
router.post("/login/submit", async (req, res) => {
  try {
    const user = await User.checkCredentials(req.body.username, req.body.password);
    const generateToken = user.generateAuthenticationToken();
    res.send(user);
  } catch (e) {
    res.status(400).send(e);
  }
});

let generatedPassword = "";
let userAccount = null;

router.get("/retrieve-account/step-1", (req, res) => {
  res.sendFile(path.join(__dirname + "../../../views/forgot-password.html"));
});

router.post("/retrieve-account/step-1/submit", async (req, res) => {
  try {
    const email = req.body.email;
    userAccount = await Account.findOne({ email });
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

router.post("/retrieve-account/step-2", async (req, res) => {
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

router.patch("/retrieve-account/step-3", async (req, res) => {
  try {
    const newPassword = req.body.password;
    await userAccount.populate("password");
  } catch (e) {
    res.status(400).send(e.message);
  }
});

module.exports = router;
