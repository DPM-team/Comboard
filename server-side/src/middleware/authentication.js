const jwt = require("jsonwebtoken");
const User = require("../models/user");

/**
 *This function will serve as middleware for user authentication
 *before any action related to the routers
 */
const authentication = async (req, res, next) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", "");
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findOne({
      _id: decoded._id,
      "tokens.token": token,
    });

    if (!user) {
      throw new Error(); //Move to catch and prints the error
    }

    req.token = token;
    req.user = user;
    next();
  } catch (error) {
    res.status(401).send({ error: "Please authenticate!" });
  }
};

module.exports = authentication;
