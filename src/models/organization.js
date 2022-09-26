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
});

const Organization = mongoose.model("Organization", organizationSchema);

module.exports = {
  Organization,
  organizationSchema,
};
