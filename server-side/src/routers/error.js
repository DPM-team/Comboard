const express = require("express");
const path = require("path");

const router = express.Router();

router.get("*", function (req, res) {
  res.send("My 404 page");
});

module.exports = router;
