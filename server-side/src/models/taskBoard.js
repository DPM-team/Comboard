const mongoose = require("mongoose");

const taskBoardSchema = mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    refs: "User",
  },
  orgId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    refs: "Organization",
  },
  projectId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Project",
  },
  name: {
    type: String,
    required: true,
    trim: true,
  },
});

const TaskBoard = mongoose.model("taskBoard", taskBoardSchema);

module.exports = TaskBoard;
