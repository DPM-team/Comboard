const randomstring = require("randomstring");
const Organization = require("../models/organization");
const Team = require("../models/team.js");
const Project = require("../models/project.js");
const User = require("../models/user.js");
const Data = require("../models/data.js");
const Email = require("../APIs/emails/email");
const sendEmail = require("../APIs/emails/send-email.js");

// We can get all the stored organization on the db
const getAllStoredOrganizations = async (req, res) => {
  try {
    const organizations = await Organization.find({});
    res.status(200).json(organizations);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getOrganizationPublicData = async (req, res) => {
  try {
    const organizationID = req.query.organizationID;

    if (!organizationID) {
      return res.status(400).json({ error: "organizationID is required!" });
    }

    const organization = await Organization.findById(organizationID);

    if (!organization) {
      return res.status(200).json({ error: "User not found!" });
    }

    const organizationObj = {
      name: organization?.name,
      description: organization?.description,
      email: organization?.email,
      telephone: organization?.telephone,
      vatNumber: organization?.vatNumber,
      location: organization?.location,
      websiteURL: organization?.websiteURL,
    };

    res.status(200).json({ organizationObj });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

// Get a specific organization based on ID
const getOrganizationByID = async (req, res) => {
  const _id = req.params.identifier;

  try {
    const organizationObj = await Organization.findById({ _id });

    if (!organizationObj) {
      return res.status(404).json({ error: "Organization don't found!" });
    }

    res.status(200).json(organizationObj);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createOrganization = async function (req, res) {
  try {
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

      const organization = await Organization.findOne({ publicKey });

      if (!organization) {
        uniqueKey = true;

        const organizationObj = new Organization({
          ...req.body.organizationObj,
          creator: userID,
          publicKey,
        });

        // Add the user to the organization's 'users' array
        organizationObj.users.push(userID);
        const savedOrganization = await organizationObj.save();

        userObj.organizations.push(savedOrganization._id);

        const organizationDataObj = new Data({ userID, organizationID: savedOrganization._id });
        const savedOrganizationDataObj = await organizationDataObj.save();

        userObj.organizationsData.push(savedOrganizationDataObj._id);

        // Save the updated user document
        await userObj.save();

        return res.status(201).json({ publicKey, organizationID: savedOrganization._id });
      }
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const joinOrganization = async function (req, res) {
  try {
    const organizationKey = req.body.organizationKey;
    const userID = req.body.userID;

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
      return res.status(404).json({ error: "Already member!" });
    }

    // Save the updated organization document
    const updatedOrganization = await organizationObj.save();

    if (!userObj.organizations.includes(updatedOrganization._id)) {
      userObj.organizations.push(updatedOrganization._id);
    } else {
      return res.status(404).json({ error: "Organization is already added!", updatedOrganization });
    }

    const organizationDataObj = new Data({ userID, organizationID: updatedOrganization._id });
    const savedOrganizationDataObj = await organizationDataObj.save();

    userObj.organizationsData.push(savedOrganizationDataObj._id);

    // Save the updated user document
    await userObj.save();

    // Return the updated organization document
    return res.json({ message: "Organization added with success!", organizationID: updatedOrganization._id, organizationName: updatedOrganization.name });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const getOrganizationGlobalPosts = async (req, res) => {
  try {
    const organizationID = req.query.organizationID;

    if (!organizationID) {
      return res.status(400).json({ error: "OrganizationID is required!" });
    }

    const organizationObj = await Organization.findById(organizationID).populate("posts");

    if (!organizationObj) {
      return res.status(404).json({ error: "Organization not found!" });
    }

    const organizationGlobalPosts = new Array();

    for (const postObj of organizationObj.posts) {
      const creatorObj = await User.findById(postObj.creatorID);
      organizationGlobalPosts.push({
        postObj,
        creatorObj: {
          name: creatorObj?.name,
          surname: creatorObj?.surname,
        },
      });
    }

    res.status(200).json({ succesMessage: "Posts loaded with success!", organizationGlobalPosts });
  } catch (error) {
    console.error(error); // Log the error for debugging purposes
    res.status(500).json({ error: "Server error." });
  }
};

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

// Controller to get all the teams of an organization
const getOrganizationTeams = async (req, res) => {
  try {
    const organizationID = req.query.organizationID;

    if (!organizationID) {
      return res.status(400).json({ error: "OrganizationID is required!" });
    }

    const organizationObj = await Organization.findById(organizationID).populate("teams");

    if (!organizationObj) {
      return res.status(404).json({ error: "Organization not found!" });
    }

    const teams = organizationObj.teams.map((teamObj) => {
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

// Controller to get all the projects of an organization
const getOrganizationProjects = async (req, res) => {
  try {
    const organizationID = req.query.organizationID;

    if (!organizationID) {
      return res.status(400).json({ error: "OrganizationID is required!" });
    }

    const organizationObj = await Organization.findById(organizationID).populate("teams");

    if (!organizationObj) {
      return res.status(404).json({ error: "Organization not found!" });
    }

    const projects = new Array();

    for (const teamObj of organizationObj.teams) {
      for (const projectID of teamObj.projects) {
        const projectObj = await Project.findById(projectID);
        projects.push({ id: projectObj._id, name: projectObj.name, description: projectObj.description });
      }
    }

    res.status(200).json({ projects });
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

const sendJoinInvitation = async (req, res) => {
  try {
    const organizationName = req.body.organizationName;
    const organizationPublicKey = req.body.organizationPublicKey;
    const receiverEmail = req.body.receiverEmail;

    const subject = "You got an invitation to join an organization!";
    const html = Email.returnShareOrgKeyTemplate(organizationName, organizationPublicKey);
    const emailObj = new Email(receiverEmail, "dpmcomboard@gmail.com", subject, html);
    sendEmail(emailObj);
    res.status(200).json({ successMessage: "Email send with success!" });
  } catch (error) {
    console.error(error); // Log the error for debugging purposes
    res.status(500).json({ error: "Server error." });
  }
};

module.exports = {
  getAllStoredOrganizations,
  getOrganizationByID,
  getOrganizationPublicData,
  createOrganization,
  joinOrganization,
  getOrganizationGlobalPosts,
  getOrganizationMembers,
  getOrganizationTeams,
  getOrganizationProjects,
  addTeamToOrganization,
  sendJoinInvitation,
};
