const mongoose = require("mongoose");

const organizationSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  orgDescription: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  telephone: {
    type: String,
  },
  vatNumber: {
    type: String,
  },
  websiteURL: {
    type: String,
  },
  users: new Array({
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
  }),
});

const Organization = mongoose.model("organization", organizationSchema);

module.exports = Organization;
