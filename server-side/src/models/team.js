const mongoose = require("mongoose");

const teamSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    supervisor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    members: new Array({
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    }),
    projects: new Array({
      type: mongoose.Schema.Types.ObjectId,
      ref: "project",
    }),
    teamsTasks: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "taskBoard",
    },
  },
  {
    timestamps: true,
  }
);

const Team = mongoose.model("team", teamSchema);

module.exports = Team;
