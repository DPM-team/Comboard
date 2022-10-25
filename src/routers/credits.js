const express = require("express");
const path = require("path");
const router = new express.Router();

router.get("/credits", function (req, res) {
  res.sendFile(path.join(__dirname + "../../../views/credits.html"));
});

module.exports = router;
