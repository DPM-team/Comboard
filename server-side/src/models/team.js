const mongoose = require("mongoose");

const teamSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

const Team = mongoose.model("team", teamSchema);

module.exports = Team;
