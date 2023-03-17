const mongoose = require("mongoose");

const taskBoardListSchema = mongoose.Schema({
  taskBoardId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    refs: "TaskBoard",
  },
  name: {
    type: String,
    required: true,
  },
  tasksList: new Array({
    type: mongoose.Schema.Types.ObjectId,
    required: false,
    refs: "TaskBoardListItem",
  }),
});

const TaskBoardList = mongoose.model("taskBoardList", taskBoardListSchema);

module.exports = TaskBoardList;
