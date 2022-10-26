const express = require("express");
const path = require("path");

const router = new express.Router();

//Router for index page
router.get("/", (req, res) => {
  res.sendFile(path.join(__dirname + "../../../index.html"));
});

//Router for credits page
router.get("/credits", function (req, res) {
  res.sendFile(path.join(__dirname + "../../../views/credits.html"));
});

module.exports = router;
