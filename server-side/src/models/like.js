const mongoose = require("mongoose");

const likeSchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    postId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    comment: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Like = mongoose.model("like", likeSchema);

module.exports = Like;
