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
  telephone: {
    type: String,
  },
  vatNumber: {
    type: String,
  },
  address: {
    type: String,
    required: true,
  },
  website: {
    type: String,
  },
  users: new Array({
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
  }),
});

const Organization = mongoose.model("organizations", organizationSchema);

module.exports = Organization;
