const mongoose = require("mongoose");

const taskBoardListItemSchema = mongoose.Schema(
  {
    taskBoardListId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      refs: "TaskBoardList",
    },
    description: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const taskBoardListItem = mongoose.model("TaskBoardListItem", taskBoardListItemSchema);

module.exports = taskBoardListItem;
