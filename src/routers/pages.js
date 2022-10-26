const express = require("express");
const path = require("path");

const router = new express.Router();

//Router for index page
router.get("/", (req, res) => {
  res.sendFile(path.join(__dirname + "../../../index.html"));
});

module.exports = router;
