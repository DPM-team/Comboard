const mongoose = require("mongoose");

const taskBoardSchema = mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  name: {
    type: String,
    required: true,
    trim: true,
  },

  //fields
});

const TaskBoard = mongoose.model("taskBoard", taskBoardSchema);

module.exports = TaskBoard;
