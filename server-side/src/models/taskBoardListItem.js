const mongoose = require("mongoose");

const taskBoardListItemSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const taskBoardListItem = mongoose.model("taskBoardListItem", taskBoardListItemSchema);

module.exports = taskBoardListItem;
