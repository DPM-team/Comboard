const User = require("../models/user.js");
const Team = require("../models/team.js");

// Controller to add a team to the user's teams list
const addTeamToUser = async (req, res) => {
  try {
    const userID = req.body.userID;
    const teamID = req.body.teamID;

    if (!userID) {
      return res.status(400).json({ error: "UserID is required!" });
    }

    if (!teamID) {
      return res.status(400).json({ error: "TeamID is required!" });
    }

    const teamObj = await Team.findById(teamID);

    if (!teamObj) {
      return res.status(404).json({ error: "Provided team doesn't exists!" });
    }

    const userObj = await User.findById(userID);

    if (!userObj) {
      return res.status(404).json({ error: "Provided user doesn't exists!" });
    }

    // Add the team to the user's 'teams' array
    if (!userObj.teams.includes(teamID)) {
      userObj.teams.push(teamID);
    } else {
      return res.status(400).json({ error: "Team is already added!" });
    }

    // Save the updated user document
    const updatedUser = await userObj.save();

    res.status(200).json({ successMessage: "The team has been successfully added to the user!", updatedUser });
  } catch (error) {
    console.error(error); // Log the error for debugging purposes
    res.status(500).json({ error: "Server error." });
  }
};

module.exports = {
  addTeamToUser,
};
