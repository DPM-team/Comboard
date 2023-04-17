const mongoose = require("mongoose");

// In this schema we store every data of a user for a specific organization
const dataSchema = mongoose.Schema({
  userID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  organizationID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "organization",
    required: true,
  },
  specialization: {
    type: String,
    required: false,
  },
  teams: new Array({
    type: mongoose.Schema.Types.ObjectId,
    ref: "team",
  }),
});

const Data = mongoose.model("data", dataSchema);

module.exports = Data;
