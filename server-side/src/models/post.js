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
    likes: new Array({
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    }),
    comments: new Array({
      userID: mongoose.Schema.Types.ObjectId,
      content: String,
      commenter: String, // The fullname of the user who comments
    }),
  },
  {
    timestamps: true,
  }
);

const Post = mongoose.model("post", postSchema);

module.exports = Post;
