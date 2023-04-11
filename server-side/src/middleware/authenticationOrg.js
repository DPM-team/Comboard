const Organization = require("../models/organization.js");

/**
 *This function will serve as middleware for organization authentication
 *before any action related to the routers
 */
const authenticationOrg = async (req, res, next) => {
  try {
    const organization = await Organization.findOne({
      _id: req.header("AuthorizationOrg"),
    });

    if (!organization) {
      throw new Error(); //Move to catch and prints the error
    }

    const existUser = organization.users.includes(req.user._id);

    if (!existUser) {
      throw new Error(); //Move to catch and prints the error
    }

    next();
  } catch (error) {
    res.status(401).send({ error: "Please authenticate!" });
  }
};

module.exports = authenticationOrg;
