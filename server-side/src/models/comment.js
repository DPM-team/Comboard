const mongoose = require("mongoose");

const commentSchema = mongoose.Schema({
  userId: {
    type: mongoose.Types.ObjectId,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  likes: new Array({
    type: mongoose.Types.ObjectId,
    required: false,
  }),
});

const Comment = mongoose.model("file", commentSchema);

module.exports = Comment;
