const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { organizationSchema } = require("./organization");
const { accountSchema } = require("./account");
const { profileSchema } = require("./profile.js");

const userSchema = mongoose.Schema({
  account: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Account",
  },
  profile: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    red: "Profile",
  },
  organizations: {
    type: [organizationSchema],
  },
});

/**
 * This is a method that generates a jwt token for a user when
 * he successfully logs into his account. The method doesn't have any parameters.
 * The "jsonwebtoken" package was used to implement the functionality
 * @returns {string} A jwt token in string format
 * @this {User} Reference to a User instance
 */
userSchema.methods.generateAuthenticationToken = async function () {
  const user = this;

  const generatedToken = jwt.sign({ _id: user._id.toString() }, process.env.JWT_SECRET);
  user.tokens = user.tokens.concat({ generatedToken });
  await user.save();

  return generatedToken;
};

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

const User = mongoose.model("User", userSchema);

module.exports = User;
