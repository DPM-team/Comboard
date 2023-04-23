const mongoose = require("mongoose");

const taskBoardSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  taskBoardListLists: new Array({
    type: mongoose.Schema.Types.ObjectId,
    ref: "taskBoardList",
  }),
});

const TaskBoard = mongoose.model("taskBoard", taskBoardSchema);

module.exports = TaskBoard;
