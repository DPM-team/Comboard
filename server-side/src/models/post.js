const mongoose = require("mongoose");

const postSchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.Types.ObjectId,
      required: true,
      trim: true,
    },
    orgId: {
      type: mongoose.Types.ObjectId,
      required: true,
    },
    content: {
      type: Buffer,
      required: true,
    },
    likes: {
      type: Number,
      required: false,
    },
    comments: {
      type: new Array({
        type: String,
      }),
    },
  },
  {
    timestamps: true,
  }
);

const Post = mongoose.model("post", postSchema);

module.exports = Post;
