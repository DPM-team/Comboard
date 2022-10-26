const express = require("express");
const path = require("path");
const router = new express.Router();

router.get("/privacy-policy", function (req, res) {
  res.sendFile(path.join(__dirname + "../../../views/policy//privacy-policy.html"));
});

router.get("/user-agreement", function (req, res) {
  res.sendFile(path.join(__dirname + "../../../views/policy/user-agreement.html"));
});

router.get("/credits", function (req, res) {
  res.sendFile(path.join(__dirname + "../../../views/policy/credits.html"));
});

module.exports = router;
