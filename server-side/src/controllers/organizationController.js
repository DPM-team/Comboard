const Organization = require("../models/organization"); // Import the Organization model

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

module.exports = {
  getOrganizationMembers,
};
