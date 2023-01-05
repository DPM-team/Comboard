const express = require("express");
const path = require("path");

const router = new express.Router();

//Router for index page
router.get("/", (req, res) => {
  res.sendFile(path.join(__dirname + "../../../../index.html"));
});

router.get("/terms/privacy-policy", function (req, res) {
  res.sendFile(path.join(__dirname + "../../../views/policy/privacy-policy.html"));
});

router.get("/terms/user-agreement", function (req, res) {
  res.sendFile(path.join(__dirname + "../../../views/policy/user-agreement.html"));
});

//Router for credits page
router.get("/credits", function (req, res) {
  res.sendFile(path.join(__dirname + "../../../views/policy/credits.html"));
});

module.exports = router;
