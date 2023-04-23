const mongoose = require("mongoose");

const taskBoardListItemSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    fromDate: {
      type: Date,
      required: false,
    },
    toDate: {
      type: Date,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

const taskBoardListItem = mongoose.model("taskBoardListItem", taskBoardListItemSchema);

module.exports = taskBoardListItem;
