const mongoose = require("mongoose");

const projectSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required!"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Description is required!"],
      trim: true,
    },
    belongsTo: {
      type: String,
      required: [true, "Goal (who is for) is required!"],
      trim: true,
    },
    completed: {
      type: Boolean,
      required: false,
      default: false,
    },
    image: {
      type: Buffer,
      required: false,
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
    projectTasks: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "taskBoard",
    },
  },
  {
    timestamps: true,
  }
);

// Code for custom error handling for duplicated and missing values
projectSchema.post("save", function (error, doc, next) {
  if (error.name === "MongoServerError" && error.code === 11000) {
    next(new Error(`${Object.keys(error.keyValue)[0]} is already in use!`));
  } else if (error.name === "ValidationError") {
    validationErrors = Object.values(error.errors).map((val) => val.message);
    if (validationErrors[0]) {
      next(new Error(validationErrors[0]));
    }
  } else {
    next(error);
  }
});

const Project = mongoose.model("project", projectSchema);

module.exports = Project;
