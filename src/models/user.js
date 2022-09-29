const mongoose = require("mongoose");
const { organizationSchema } = require("./organization");
const { accountSchema } = require("./account");
const { profileSchema } = require("./profile.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userSchema = mongoose.Schema({
  account: {
    type: accountSchema,
  },
  profile: {
    type: profileSchema,
    required: true,
  },
  organizations: {
    type: [organizationSchema],
  },
});

/**
 * This is a static function that checks the credentials of user.
 * @param {username} username The username that the user puts in the field.
 * @param {password} password The password that the user puts in the field.
 * @returns {user} A user instance is returned.
 */
userSchema.statics.checkCredentials = async (username, password) => {
  const user = await User.findOne({ account: { username } });

  if (!user) {
    throw new Error("You can not login.Try again");
  }

  const passwordMatch = bcrypt.compare(password, user.account.password);

  if (!passwordMatch) {
    throw new Error("You can not login.Try again");
  }

  return user;
};

/**
 * This ia a method which generates a token for each existing connection of user in the app.
 * @returns {generatedToken} Returns the generated token.
 */
userSchema.methods.generateAuthenticationToken = async () => {
  const generatedToken = jwt.sign({ _id: this._id.toString() }, process.env.JWT_SECRET);

  //add token in user's array

  return generatedToken;
};

const User = mongoose.model("User", userSchema);

module.exports = User;
