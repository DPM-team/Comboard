const mongoose = require("mongoose");
const { organizationSchema } = require("./organization");
const { accountSchema } = require("./account");

const userSchema = mongoose.Schema({
  account: {
    type: accountSchema,
  },
  profile: {
    type: new Schema(), //Profile Schema
    required: true,
  },
  organizations: {
    type: [organizationSchema],
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
