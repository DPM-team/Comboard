const Team = require("../models/team.js");
const userUtils = require("../utils/userUtils.js");

const createTeam = async (req, res) => {
  try {
    let { name, description, supervisor, members } = req.body;

    name = name.trim();
    description = description.trim();

    // Validate required fields
    if (!name) {
      return res.status(400).json({ error: "Team name is required field!" });
    }

    if (!description) {
      return res.status(400).json({ error: "Team description is required field!" });
    }

    if (!supervisor) {
      return res.status(400).json({ error: "Team supervisor (ID) is required field!" });
    }

    if (members?.length <= 0) {
      return res.status(400).json({ error: "At least one member should added!" });
    }

    //Chech if users with the given IDs exists in the db
    const supervisorExists = await userUtils.userExists(supervisor);

    if (supervisorExists?.error) {
      return res.status(400).json({ error: supervisorExists.error });
    }

    const membersExists = await userUtils.usersExists(members);

    if (membersExists?.error) {
      return res.status(400).json({ error: membersExists.error });
    }

    // Create a new team object
    const team = new Team({
      name,
      description,
      supervisor,
      members,
    });

    // Save the team to the database
    const createdTeam = await team.save();

    res.status(201).json({ successMessage: "Team is created with success!", createdTeam });
  } catch (error) {
    console.error(error); // Log the error for debugging purposes
    res.status(500).json({ error: "Server error." });
  }
};

module.exports = {
  createTeam,
};
