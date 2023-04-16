const Organization = require("../models/organization");
const Team = require("../models/team.js");

// Controller to get all the members of an organization
const getOrganizationMembers = async (req, res) => {
  try {
    const organizationID = req.query.organizationID;

    if (!organizationID) {
      return res.status(400).json({ error: "OrganizationID is required!" });
    }

    const organizationObj = await Organization.findById(organizationID).populate("users");

    if (!organizationObj) {
      return res.status(404).json({ error: "Organization not found!" });
    }

    const members = organizationObj.users.map((memberObj) => {
      return {
        id: memberObj._id,
        fullname: memberObj.name + " " + memberObj.surname,
      };
    });

    res.status(200).json({ members });
  } catch (error) {
    console.error(error); // Log the error for debugging purposes
    res.status(500).json({ error: "Server error." });
  }
};

// Controller to add a team to the organization's teams list
const addTeamToOrganization = async (req, res) => {
  try {
    const organizationID = req.body.organizationID;
    const teamID = req.body.teamID;

    if (!organizationID) {
      return res.status(400).json({ error: "OrganizationID is required!" });
    }

    if (!teamID) {
      return res.status(400).json({ error: "TeamID is required!" });
    }

    const teamObj = await Team.findById(teamID);

    if (!teamObj) {
      return res.status(404).json({ error: "Provided team doesn't exists!" });
    }

    const organizationObj = await Organization.findById(organizationID);

    if (!organizationObj) {
      return res.status(404).json({ error: "Provided organization doesn't exists!" });
    }

    // Add the team to the organization's 'teams' array
    if (!organizationObj.teams.includes(teamID)) {
      organizationObj.teams.push(teamID);
    } else {
      return res.status(400).json({ error: "Team is already added!" });
    }

    // Save the updated organization document
    const updatedOrganization = await organizationObj.save();

    res.status(200).json({ successMessage: "The team has been successfully added to the organization!", updatedOrganization });
  } catch (error) {
    console.error(error); // Log the error for debugging purposes
    res.status(500).json({ error: "Server error." });
  }
};

module.exports = {
  getOrganizationMembers,
  addTeamToOrganization,
};
