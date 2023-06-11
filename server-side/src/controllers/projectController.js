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

const getProject = async (req, res) => {
  try {
    const projectID = req.query.projectID;

    if (!projectID) {
      return res.status(400).json({ error: "ProjectID is required field!" });
    }

    const projectObj = await Project.findById(projectID);

    if (!projectObj) {
      return res.status(404).json({ error: "Team don't found!" });
    }

    res.status(200).json({ projectObj });
  } catch (error) {
    res.status(500).json({ error: "Server error." });
  }
};

// Controller to get all the members of a team
const getProjectMembers = async (req, res) => {
  try {
    const projectID = req.query.projectID;

    if (!projectID) {
      return res.status(400).json({ error: "projectID is required!" });
    }

    const projectObj = await Project.findById(projectID).populate("members");

    if (!projectObj) {
      return res.status(404).json({ error: "Project not found!" });
    }

    const members = projectObj.members.map((memberObj) => {
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

const getProjectSupervisor = async (req, res) => {
  try {
    const projectID = req.query.projectID;

    if (!projectID) {
      return res.status(400).json({ error: "projectID is required!" });
    }

    const projectObj = await Project.findById(projectID).populate("supervisor");

    if (!projectObj) {
      return res.status(404).json({ error: "Project not found!" });
    }

    res.status(200).json({
      projectSupervisor: {
        id: projectObj?.supervisor?._id,
        fullname: projectObj?.supervisor?.name + " " + projectObj?.supervisor?.surname,
      },
    });
  } catch (error) {
    console.error(error); // Log the error for debugging purposes
    res.status(500).json({ error: "Server error." });
  }
};

const updateProjectData = async (req, res) => {
  const allowedUpdates = new Array("name", "description", "belongsTo", "completed");

  try {
    const projectID = req.body.projectID;
    const updates = Object.keys(req.body.updates);

    if (!projectID) {
      return res.status(400).json({ error: "'projectID' is required!" });
    }

    if (!updates) {
      return res.status(400).json({ error: "'updates' are required!" });
    }

    const isValidOperation = updates.every((item) => {
      return allowedUpdates.includes(item);
    });

    if (!isValidOperation) {
      return res.status(400).json({ error: "Invalid updates!" });
    }

    const projectObj = await Project.findById(projectID);

    if (!projectObj) {
      return res.status(404).json({ error: "Provided project doesn't exists!" });
    }

    updates.forEach((field) => {
      projectObj[field] = req.body.updates[field];
    });

    await projectObj.save();

    res.status(200).json({
      successMessage: "The project has been successfully updated!",
      newName: projectObj?.name,
      newDescription: projectObj?.description,
      newGoal: projectObj?.belongsTo,
      newStatus: projectObj?.completed,
    });
  } catch (error) {
    console.error(error); // Log the error for debugging purposes
    res.status(500).json({ error: "Server error." });
  }
};

module.exports = {
  createProject,
  getProject,
  getProjectMembers,
  getProjectSupervisor,
  updateProjectData,
};
