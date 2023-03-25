const express = require("express");
const Organization = require("../models/organization.js");
const randomstring = require("randomstring");
const User = require("../models/user.js");

const router = express.Router();

router.post("/api/organization", async function (req, res) {
  let uniqueKey = false;

  while (!uniqueKey) {
    const publicKey = randomstring.generate(32); // Returns a unique string with 32 chars

    try {
      await Organization.find({ publicKey }).then(async (result) => {
        if (result.length === 0) {
          uniqueKey = true;

          const organizationObj = new Organization({
            ...req.body,
            publicKey,
          });

          try {
            await organizationObj.save();
            res.status(201).send({ publicKey });
          } catch (error) {
            res.status(400).send({ error: error.message });
          }
        }
      });
    } catch (error) {
      res.status(500).send(error);
    }
  }
});

router.post("/api/organization/join", async function (req, res) {
  const organizationID = req.body.organizationID;
  const userID = req.body.userID;

  try {
    // Find the organization by its id
    const organizationObj = await Organization.findById(organizationID);

    if (!organizationObj) {
      return res.status(404).json({ error: "Organization not found!" });
    }

    // Find the user by its id
    const userObj = await User.findById(userID);

    if (!userObj) {
      return res.status(404).json({ error: "User not found!" });
    }

    // Add the user to the organization's 'users' array
    if (!organizationObj.users.includes(userID)) {
      organizationObj.users.push(userID);
    } else {
      return res.status(404).json({ error: "User is already added!" });
    }

    // Save the updated organization document
    const updatedOrganization = await organizationObj.save();

    if (!userObj.organizations.includes(organizationID)) {
      userObj.organizations.push(organizationID);
    } else {
      return res.status(404).json({ error: "Organization is already added!", updatedOrganization });
    }

    // Save the updated user document
    const updatedUser = await userObj.save();

    // Return the updated organization document
    return res.json({ updatedOrganization, updatedUser });
  } catch (error) {
    return res.status(500).json({ error: "Server error" });
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
