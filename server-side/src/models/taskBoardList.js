const mongoose = require("mongoose");

const taskBoardListSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  taskBoardListItemsLists: new Array({
    type: mongoose.Schema.Types.ObjectId,
    ref: "taskBoardListItem",
  }),
});

const TaskBoardList = mongoose.model("taskBoardList", taskBoardListSchema);

module.exports = TaskBoardList;
