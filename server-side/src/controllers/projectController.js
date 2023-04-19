const Project = require("../models/project.js");
const userUtils = require("../utils/userUtils.js");

const createProject = async (req, res) => {
  try {
    let { name, belongsTo, description, supervisor, members } = req.body;

    name = name.trim();
    belongsTo = belongsTo.trim();
    description = description.trim();

    // Validate required fields
    if (!name) {
      return res.status(400).json({ error: "Project name is required field!" });
    }

    if (!belongsTo) {
      return res.status(400).json({ error: "Intention is required field!" });
    }

    if (!description) {
      return res.status(400).json({ error: "Project description is required field!" });
    }

    if (!supervisor) {
      return res.status(400).json({ error: "Project supervisor (ID) is required field!" });
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

    // Create a new project object
    const project = new Project({
      name,
      belongsTo,
      description,
      supervisor,
      members,
    });

    // Save the project to the database
    const createdProject = await project.save();

    res.status(201).json({ successMessage: "Project is created with success!", createdProject });
  } catch (error) {
    console.error(error); // Log the error for debugging purposes
    res.status(500).json({ error: "Server error." });
  }
};

module.exports = {
  createProject,
};
