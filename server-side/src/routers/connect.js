const express = require("express");
const path = require("path");
const generator = require("generate-password");
const User = require("../models/user");
const Email = require("../APIs/emails/email");
const sendEmail = require("../APIs/emails/send-email.js");
const fieldsAreMissing = require("../validation/fields-are-missing");

const router = new express.Router();

router.post("/api/register", async (req, res) => {
  try {
    const userObj = new User(req.body);
    await userObj.save();
    const generatedToken = await userObj.generateAuthenticationToken();
    res.status(201).json({ userObj, generatedToken });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

//This is the router which runs when one user tries to login. User informaton will be sent back to client.
router.post("/api/login", async (req, res) => {
  try {
    const error = fieldsAreMissing(req.body);

    if (error) {
      throw new Error(error.message);
    }

    const userObj = await User.checkCredentials(req.body.username, req.body.password);
    const generatedToken = await userObj.generateAuthenticationToken();
    res.status(200).json({ userObj, generatedToken });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

let generatedPassword = "";
let userAccount = null;

router.get("/retrieve-account/step-1", (req, res) => {
  res.sendFile(path.join(__dirname + "../../../views/forgot-password.html"));
});

router.post("/api/retrieve-account/step-1", async (req, res) => {
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
    setTimeout(() => {
      generatedPassword = "";
    }, 200000);
    res.send();
  } catch (e) {
    res.status(400).send(e.message);
  }
});

router.post("/api/retrieve-account/step-2", async (req, res) => {
  try {
    const inputedPassword = req.body.password;

    if (!userAccount) {
      throw new Error("You must have an account");
    }

    if (inputedPassword !== generatedPassword) {
      throw new Error("Check your email again.");
    }
    res.send();
  } catch (e) {
    res.status(400).send(e.message);
  }
});

router.post("/api/retrieve-account/step-3", async (req, res) => {
  try {
    const newPassword = req.body.password;
    userAccount.password = newPassword;
    await userAccount.save();
    res.send();
  } catch (e) {
    res.status(400).send(e.message);
  }
});

module.exports = router;
