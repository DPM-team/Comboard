const mongoose = require("mongoose");

const projectSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    belongsTo: {
      type: String,
      required: true,
      trim: true,
    },
    completed: {
      type: Boolean,
      default: false,
    },
    image: {
      type: Buffer,
      required: false,
    },
    members: new Array({
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    }),
    projectTasks: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "taskBoard",
    },
  },
  {
    timestamps: true,
  }
);

const Project = mongoose.model("project", projectSchema);

module.exports = Project;
