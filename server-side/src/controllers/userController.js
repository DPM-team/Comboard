const User = require("../models/user.js");
const Team = require("../models/team.js");
const Data = require("../models/data.js");
const Project = require("../models/project.js");

const getUser = async (req, res) => {
  try {
    const userID = req.query.userID;

    if (!userID) {
      return res.status(400).json({ error: "userID is required!" });
    }

    const userObj = await User.findById(userID);

    if (!userObj) {
      return res.status(200).json({ error: "User not found!" });
    }

    res.status(200).json({ userObj });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

const getUserOrganizationData = async (req, res) => {
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
    const userOrgData = await Data.findOne({ userID, organizationID }).populate("userID");

    if (!userOrgData) {
      return res.status(404).json({ error: "User's data for this organization doesn't found!" });
    }

    const userObj = {
      // Data common for all organizations
      firstname: userOrgData?.userID?.name,
      lastname: userOrgData?.userID?.surname,
      address: userOrgData?.userID?.address,
      gender: userOrgData?.userID?.gender,
      birthday: userOrgData?.userID?.birthday,
      linkedinLink: userOrgData?.userID?.linkedinLink,
      // Data for the specific organization
      email: userOrgData?.email,
      telephone: userOrgData?.telephone,
      bio: userOrgData?.bio,
      specialization: userOrgData?.specialization,
      profilePhoto: userOrgData?.profilePhoto,
    };

    res.status(200).json({ userObj });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

const getUserOrganizations = async (req, res) => {
  try {
    const userID = req.query.userID;

    if (!userID) {
      return res.status(400).json({ error: "UserID is required!" });
    }

    const userObj = await User.findById(userID).populate("organizations");

    if (!userObj) {
      return res.status(400).json({ error: "User not found!" });
    }

    const organizations = userObj.organizations.map((organizationObj) => {
      return {
        id: organizationObj._id,
        name: organizationObj.name,
      };
    });

    res.status(200).json({ organizations });
  } catch (error) {
    console.error(error);
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
        supervisorID: teamObj.supervisor.toString(),
      };
    });

    res.status(200).json({ teams });
  } catch (error) {
    console.error(error); // Log the error for debugging purposes
    res.status(500).json({ error: "Server error." });
  }
};

// Controller to get all the projects of a user
const getUserProjects = async (req, res) => {
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
    const userOrgData = await Data.findOne({ userID, organizationID }).populate("projects");

    if (!userOrgData) {
      return res.status(404).json({ error: "User's data for this organization doesn't found!" });
    }

    const projects = userOrgData.projects.map((projectObj) => {
      return {
        id: projectObj._id,
        name: projectObj.name,
        description: projectObj.description,
        supervisorID: projectObj.supervisor.toString(),
      };
    });

    res.status(200).json({ projects });
  } catch (error) {
    console.error(error); // Log the error for debugging purposes
    res.status(500).json({ error: "Server error." });
  }
};

const getUserConnections = async (req, res) => {
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
    const userOrgData = await Data.findOne({ userID, organizationID }).populate("connections");

    if (!userOrgData) {
      return res.status(404).json({ error: "User's data for this organization doesn't found!" });
    }

    const connections = userOrgData.connections.map((userObj) => {
      return {
        id: userObj._id,
        name: userObj.name,
        surname: userObj.surname,
      };
    });

    res.status(200).json({ connections });
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

// Controller to add a project to the user's projects list
const addProjectToUser = async (req, res) => {
  try {
    const userID = req.body.userID;
    const organizationID = req.body.organizationID;
    const projectID = req.body.projectID;

    if (!userID) {
      return res.status(400).json({ error: "UserID is required!" });
    }

    if (!organizationID) {
      return res.status(400).json({ error: "OrganizationID is required!" });
    }

    if (!projectID) {
      return res.status(400).json({ error: "ProjectID is required!" });
    }

    const projectObj = await Project.findById(projectID);

    if (!projectObj) {
      return res.status(404).json({ error: "Provided project doesn't exists!" });
    }

    // We get the user's data for a specific organization
    const userOrgData = await Data.findOne({ userID, organizationID });

    if (!userOrgData) {
      return res.status(404).json({ error: "User's data for this organization doesn't found!" });
    }

    // Add the project to the user's 'projects' array
    if (!userOrgData?.projects.includes(projectID)) {
      userOrgData.projects.push(projectID);
    } else {
      return res.status(400).json({ error: "Project is already added!" });
    }

    // Save the updated document
    await userOrgData.save();

    res.status(200).json({ successMessage: "The project has been successfully added to the user!" });
  } catch (error) {
    console.error(error); // Log the error for debugging purposes
    res.status(500).json({ error: "Server error." });
  }
};

// Controller to add a project to the user's projects list
const updateProfileData = async (req, res) => {
  try {
    const organizationID = req.query.organizationID;
    const formData = req.body;

    if (!organizationID) {
      return res.status(400).json({ error: "OrganizationID is required!" });
    }

    if (!formData) {
      return res.status(400).json({ error: "ProjectID is required!" });
    }

    // We get the user's data for a specific organization
    const userOrgData = await Data.findOne({ userID: req.user._id, organizationID });

    if (!userOrgData) {
      return res.status(404).json({ error: "User's data for this organization doesn't found!" });
    }

    userOrgData.$set(formData);

    console.log(userOrgData);

    await userOrgData.save();

    res.status(200).json({ successMessage: "The data has updated succesfully" });
  } catch (error) {
    console.error(error); // Log the error for debugging purposes
    res.status(500).json({ error: "Server error." });
  }
};

module.exports = {
  getUser,
  getUserOrganizationData,
  getUserOrganizations,
  getUserTeams,
  getUserProjects,
  getUserConnections,
  addTeamToUser,
  addProjectToUser,
  updateProfileData,
};
