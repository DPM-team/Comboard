const mongoose = require("mongoose");

const organizationSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Organization's name is required!"],
    },
    description: {
      type: String,
      required: false,
    },
    email: {
      type: String,
      unique: true,
      required: [true, "Organization's email is required!"],
    },
    telephone: {
      type: String,
      required: [true, "Organization's telephone is required!"],
    },
    vatNumber: {
      type: String,
      required: false,
    },
    location: {
      type: String,
      required: [true, "Organization's location is required!"],
    },
    websiteURL: {
      type: String,
      required: false,
    },
    publicKey: {
      type: String,
      required: true,
      unique: true,
    },
    creator: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    users: new Array({
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    }),
    teams: new Array({
      type: mongoose.Schema.Types.ObjectId,
      ref: "team",
    }),
  },
  {
    timestamps: true,
  }
);

// Code for custom error handling for duplicated and missing values
organizationSchema.post("save", function (error, doc, next) {
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

const Organization = mongoose.model("organization", organizationSchema);

module.exports = Organization;
