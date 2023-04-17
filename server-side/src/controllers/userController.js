const User = require("../models/user.js");
const Team = require("../models/team.js");
const Data = require("../models/data.js");

const getUserOrganizations = async (req, res) => {
  try {
    const userID = req.query.userID;

    if (!userID) {
      return res.status(400).json({ error: "UserID is required!" });
    }

    const userObj = await User.findById(userID).populate("organizations");

    if (!userObj) {
      return res.status(200).json({ error: "User not found!" });
    }

    const organizations = userObj.organizations.map((organizationObj) => {
      return {
        id: organizationObj._id,
        name: organizationObj.name,
      };
    });

    res.status(200).json({ organizations });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

// Controller to get all the teams of a user
const getUserTeams = async (req, res) => {
  try {
    const userID = req.query.userID;
    const organizationID = req.query.organizationID;

    if (!userID) {
      return res.status(400).json({ error: "UserID is required!" });
    }

    if (!organizationID) {
      return res.status(400).json({ error: "OrganizationID is required!" });
    }

    // We get the user's data for a specific organization
    const userOrgData = await Data.findOne({ userID, organizationID }).populate("teams");

    if (!userOrgData) {
      return res.status(404).json({ error: "User's data for this organization doesn't found!" });
    }

    const teams = userOrgData.teams.map((teamObj) => {
      return {
        id: teamObj._id,
        name: teamObj.name,
        description: teamObj.description,
      };
    });

    res.status(200).json({ teams });
  } catch (error) {
    console.error(error); // Log the error for debugging purposes
    res.status(500).json({ error: "Server error." });
  }
};

// Controller to add a team to the user's teams list
const addTeamToUser = async (req, res) => {
  try {
    const userID = req.body.userID;
    const organizationID = req.body.organizationID;
    const teamID = req.body.teamID;

    if (!userID) {
      return res.status(400).json({ error: "UserID is required!" });
    }

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

    // We get the user's data for a specific organization
    const userOrgData = await Data.findOne({ userID, organizationID });

    if (!userOrgData) {
      return res.status(404).json({ error: "User's data for this organization doesn't found!" });
    }

    // Add the team to the user's 'teams' array
    if (!userOrgData?.teams.includes(teamID)) {
      userOrgData.teams.push(teamID);
    } else {
      return res.status(400).json({ error: "Team is already added!" });
    }

    // Save the updated document
    await userOrgData.save();

    res.status(200).json({ successMessage: "The team has been successfully added to the user!" });
  } catch (error) {
    console.error(error); // Log the error for debugging purposes
    res.status(500).json({ error: "Server error." });
  }
};

module.exports = {
  getUserOrganizations,
  getUserTeams,
  addTeamToUser,
};
