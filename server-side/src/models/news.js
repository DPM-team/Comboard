const mongoose = require("mongoose");

const newsSchema = mongoose.Schema(
  {
    content: {
      type: String,
      required: true,
      trim: true,
    },
    type: {
      type: String,
      required: true,
      validate: function (value) {
        if (value !== "organization" || value !== "team" || value !== "project" || value !== "user") {
          throw new Error("Wrong news type!");
        }
      },
    },
    referenceID: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const News = mongoose.model("news", newsSchema);

module.exports = News;
