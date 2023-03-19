const mongoose = require("mongoose");

const organizationSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: false,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    telephone: {
      type: String,
      required: true,
    },
    vatNumber: {
      type: String,
    },
    location: {
      type: String,
      required: true,
    },
    websiteURL: {
      type: String,
      required: false,
    },
    publicKey: {
      type: String,
      required: true,
      unique: true,
    },
    users: new Array({
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    }),
  },
  {
    timestamps: true,
  }
);

const Organization = mongoose.model("organization", organizationSchema);

module.exports = Organization;
