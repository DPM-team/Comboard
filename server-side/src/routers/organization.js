const express = require("express");
const Organization = require("../models/organization.js");

const router = express.Router();

router.post("/api/organization", async function (req, res) {
  const organizationObj = new Organization({
    ...req.body,
  });

  try {
    await organizationObj.save();
    res.status(201).send(organizationObj);
  } catch (error) {
    res.status(400).send(error);
  }
});

module.exports = router;
