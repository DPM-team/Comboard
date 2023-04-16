const User = require("../models/user.js");

// Function to validate if a user with the given ID exists
const userExists = async (userID) => {
  const userObj = await User.findById(userID);

  if (!userObj) {
    return { error: `User not found: ${userID}` };
  }
};

// Function to validate if multiple users with the given IDs exist
const usersExists = async (userIDs) => {
  const users = await User.find({ _id: { $in: userIDs } }); // We use $in operator to query for multiple users
  const existingUserIds = users.map((user) => user._id.toString()); // Get the existing user IDs as strings
  const missingUserIds = userIDs.filter((userId) => !existingUserIds.includes(userId)); // Get the missing user IDs

  if (missingUserIds.length > 0) {
    return { error: `Users not found: ${missingUserIds.join(", ")}` }; // Return an error object with missing user IDs
  }
};

module.exports = {
  userExists,
  usersExists,
};
