const mongoose = require("mongoose");
const { organizationSchema } = require("./organization");
const { accountSchema } = require("./account");
const { profileSchema } = require("./profile.js");

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

const User = mongoose.model("User", userSchema);

module.exports = User;
