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
  bio: {
    type: String,
    required: false,
  },
  email: {
    type: String,
    required: false,
  },
  telephone: {
    type: String,
    required: false,
  },
  profilePhoto: {
    type: Buffer,
    required: false,
  },
  teams: new Array({
    type: mongoose.Schema.Types.ObjectId,
    ref: "team",
  }),
  projects: new Array({
    type: mongoose.Schema.Types.ObjectId,
    ref: "project",
  }),
  posts: new Array({
    type: mongoose.Schema.Types.ObjectId,
    ref: "post",
  }),
  connections: new Array({
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  }),
  pendingRequestsSend: new Array({
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  }),
  pendingRequestsReceive: new Array({
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  }),
  taskBoards: new Array({
    type: mongoose.Schema.Types.ObjectId,
    ref: "taskBoard",
  }),
  files: new Array({
    type: mongoose.Schema.Types.ObjectId,
    ref: "file",
  }),
  notifications: new Array({
    type: mongoose.Schema.Types.ObjectId,
    ref: "notification",
  }),
});

const Data = mongoose.model("data", dataSchema);

module.exports = Data;
