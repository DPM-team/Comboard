const express = require("express");
const randomstring = require("randomstring");
const Organization = require("../models/organization.js");
const User = require("../models/user.js");
const organizationController = require("../controllers/organizationController"); // Import the organization controller

const router = express.Router();

// Router to create a new organization
router.post("/api/organization", async function (req, res) {
  // The user who creates the organization (current owner)
  const userID = req.body.userID;

  // Find the user by its id
  const userObj = await User.findById(userID);

  if (!userObj) {
    return res.status(404).json({ error: "User not found!" });
  }

  let uniqueKey = false;

  while (!uniqueKey) {
    const publicKey = randomstring.generate(32); // Returns a unique string with 32 chars

    try {
      await Organization.find({ publicKey }).then(async (result) => {
        if (result.length === 0) {
          uniqueKey = true;

          const organizationObj = new Organization({
            ...req.body.organizationObj,
            creator: userID,
            publicKey,
          });

          // Add the user to the organization's 'users' array
          if (!organizationObj.users.includes(userID)) {
            organizationObj.users.push(userID);
          } else {
            return res.status(404).json({ error: "User is already added!" });
          }

          try {
            const savedOrganization = await organizationObj.save();

            if (!userObj.organizations.includes(savedOrganization._id)) {
              userObj.organizations.push(savedOrganization._id);
            } else {
              return res.status(404).json({ error: "Organization is already added!", savedOrganization });
            }

            // Save the updated user document
            await userObj.save();

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

// Router to a user can join organization
router.post("/api/organization/join", async function (req, res) {
  const organizationKey = req.body.organizationKey;
  const userID = req.body.userID;

  try {
    // Find the organization by its public sharable key
    const organizationObj = await Organization.findOne({ publicKey: organizationKey });

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

    if (!userObj.organizations.includes(updatedOrganization._id)) {
      userObj.organizations.push(updatedOrganization._id);
    } else {
      return res.status(404).json({ error: "Organization is already added!", updatedOrganization });
    }

    // Save the updated user document
    await userObj.save();

    // Return the updated organization document
    return res.json({ message: "Successfully organization added!", organizationID: updatedOrganization._id, organizationName: updatedOrganization.name });
  } catch (error) {
    return res.status(500).json({ error: "Server error" });
  }
});

// Router for /api/organization/members
router.get("/api/organization/members", organizationController.getOrganizationMembers);

// Router for /api/organization/teams
router.get("/api/organization/teams", organizationController.getOrganizationTeams);

//Router to get all the stored organizations
router.get("/api/organizations", async function (req, res) {
  try {
    Organization.find({}).then((result) => {
      res.status(200).send(result);
    });
  } catch (error) {
    res.status(500).send(error);
  }
});

// Router to add a new team to the organization the belongs
router.post("/api/organization/team", organizationController.addTeamToOrganization);

// Router to get a specific organization based of its ID
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
