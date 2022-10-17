const express = require("express");
const User = require("../models/user");
const { Account } = require("../models/account");
const router = new express.Router();
const Email = require("../APIs/emails/email");
const sendEmail = require("../APIs/emails/send-email");
const generator = require("generate-password");
let generatedPassword = "";
let userAccount = null;

router.post("/retrieve-account", async (req, res) => {
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
