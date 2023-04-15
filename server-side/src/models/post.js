const mongoose = require("mongoose");

const postSchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.Types.ObjectId,
      required: true,
      trim: true,
      ref: "User",
    },
    orgId: {
      type: mongoose.Types.ObjectId,
      required: true,
    },
    contentString: {
      type: String,
      required: false,
    },
    contentMedia: {
      type: Buffer,
      required: false,
    },
    likes: {
      type: new Array({
        type: mongoose.Types.ObjectId,
      }),
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
