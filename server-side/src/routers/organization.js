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

router.get("/api/organizations", async function (req, res) {
  try {
    Organization.find({}).then((result) => {
      res.status(200).send(result);
    });
  } catch (error) {
    res.status(500).send(error);
  }
});

router.get("/api/organization/:identifier", async function (req, res) {
  const _id = req.params.identifier;

  try {
    const organizationObj = await Organization.findOne({ _id });

    if (!organizationObj) {
      return res.status(404).send("Organization don't found");
    }

    res.status(200).send(organizationObj);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
