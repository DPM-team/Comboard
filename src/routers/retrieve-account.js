const express = require("");
const User = require("../models/user");
const router = new express.Router();
const Email = require("../APIs/emails/email");
const sendEmail = require("../APIs/emails/send-email");
const generator = require("generate-password");
const generatedPassword = "";
const user = null;

router.post("/retrieve-account", async (req, res) => {
  try {
    const email = req.body.email;
    user = User.findOne({ account: { email } });
    if (!user) {
      throw new Error();
    }
    const subject = "Retrieve Account";
    generatedPassword = generator.generate({
      length: 10,
      numbers: true,
      symbols: true,
      strict: true,
    });
    const html = `<div>${generatedPassword}</div>`;
    const emailObj = new Email(email, "", subject, html);

    sendEmail(emailObj);
  } catch (e) {
    res.status(400).send();
  }
});

router.post("/retrive-account/step-2", async (req, res) => {
  try {
    const inputedPassword = req.body.password;

    if (inputedPassword !== generatedPassword) {
      throw new Error();
    }
  } catch (e) {
    res.status(400).send();
  }
});

router.post("/retrive-account/step-3", async (req, res) => {
  const newPassword = req.body.password;

  //save password
});
