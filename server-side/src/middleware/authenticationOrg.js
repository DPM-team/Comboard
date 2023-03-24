const jwt = require("jsonwebtoken");
const Organization = require("../models/organization.js");
const User = require("../models/user");

/**
 *This function will serve as middleware for organization authentication
 *before any action related to the routers
 */
const authenticationOrg = async (req, res, next) => {
  try {
    const organization = await Organization.find({
      _id: req.orgId,
    });

    if (!organization) {
      throw new Error(); //Move to catch and prints the error
    }

    const existUser = 6;

    if (!existUser) {
      throw new Error(); //Move to catch and prints the error
    }

    next();
  } catch (error) {
    res.status(401).send({ error: "Please authenticate!" });
  }
};

module.exports = authenticationOrg;
