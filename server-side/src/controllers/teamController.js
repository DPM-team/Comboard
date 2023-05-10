const Project = require("../models/project.js");
const Team = require("../models/team.js");
const userUtils = require("../utils/userUtils.js");

const getTeam = async (req, res) => {
  try {
    const teamID = req.query.teamID;

    if (!teamID) {
      return res.status(400).json({ error: "TeamID is required field!" });
    }

    const teamObj = await Team.findById(teamID);

    if (!teamObj) {
      return res.status(404).json({ error: "Team don't found!" });
    }

    res.status(200).json({ teamObj });
  } catch (error) {
    res.status(500).json({ error: "Server error." });
  }
};

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

// Controller to get all the members of a team
const getTeamMembers = async (req, res) => {
  try {
    const teamID = req.query.teamID;

    if (!teamID) {
      return res.status(400).json({ error: "TeamID is required!" });
    }

    const teamObj = await Team.findById(teamID).populate("members");

    if (!teamObj) {
      return res.status(404).json({ error: "Team not found!" });
    }

    const members = teamObj.members.map((memberObj) => {
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

const getTeamSupervisor = async (req, res) => {
  try {
    const teamID = req.query.teamID;

    if (!teamID) {
      return res.status(400).json({ error: "TeamID is required!" });
    }

    const teamObj = await Team.findById(teamID).populate("supervisor");

    if (!teamObj) {
      return res.status(404).json({ error: "Team not found!" });
    }

    res.status(200).json({
      teamSupervisor: {
        id: teamObj?.supervisor?._id,
        fullname: teamObj?.supervisor?.name + " " + teamObj?.supervisor?.surname,
      },
    });
  } catch (error) {
    console.error(error); // Log the error for debugging purposes
    res.status(500).json({ error: "Server error." });
  }
};

const getTeamProjects = async (req, res) => {
  try {
    const teamID = req.query.teamID;

    if (!teamID) {
      return res.status(400).json({ error: "TeamID is required!" });
    }

    const teamObj = await Team.findById(teamID).populate("projects");

    if (!teamObj) {
      return res.status(404).json({ error: "Team not found!" });
    }

    const projects = teamObj.projects.map((projectObj) => {
      return {
        id: projectObj._id,
        name: projectObj.name,
      };
    });

    res.status(200).json({ projects });
  } catch (error) {
    console.error(error); // Log the error for debugging purposes
    res.status(500).json({ error: "Server error." });
  }
};

// Controller to add a project to the project's projects list
const addProjectToTeam = async (req, res) => {
  try {
    const teamID = req.body.teamID;
    const projectID = req.body.projectID;

    if (!teamID) {
      return res.status(400).json({ error: "TeamID is required!" });
    }

    if (!projectID) {
      return res.status(400).json({ error: "ProjectID is required!" });
    }

    const teamObj = await Team.findById(teamID);

    if (!teamObj) {
      return res.status(404).json({ error: "Provided team doesn't exists!" });
    }

    const projectObj = await Project.findById(projectID);

    if (!projectObj) {
      return res.status(404).json({ error: "Provided project doesn't exists!" });
    }

    // Add the project to the team's 'projects' array
    if (!teamObj.projects.includes(projectID)) {
      teamObj.projects.push(projectID);
    } else {
      return res.status(400).json({ error: "Project is already added!" });
    }

    // Save the updated organization document
    const updatedTeam = await teamObj.save();

    res.status(200).json({ successMessage: "The project has been successfully added to the team!", updatedTeam });
  } catch (error) {
    console.error(error); // Log the error for debugging purposes
    res.status(500).json({ error: "Server error." });
  }
};

module.exports = {
  getTeam,
  createTeam,
  getTeamMembers,
  getTeamSupervisor,
  getTeamProjects,
  addProjectToTeam,
};
