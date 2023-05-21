const mongoose = require("mongoose");
const validator = require("validator");
const { phone } = require("phone");
const validUrl = require("valid-url");

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
      trim: true,
      lowercase: true,
      validate: function (value) {
        if (!validator.isEmail(value)) {
          throw new Error("Wrong email format!");
        }
      },
    },
    telephone: {
      type: String,
      required: [true, "Organization's telephone is required!"],
      validate: function (value) {
        if (!phone(value, { validateMobilePrefix: false }).isValid) {
          throw new Error("Wrong telephone format!");
        }
      },
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
      validate: function (value) {
        if (value.trim() && !validUrl.isUri(value)) {
          throw new Error("Wrong website format!");
        }
      },
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
    posts: new Array({
      type: mongoose.Schema.Types.ObjectId,
      ref: "post",
    }),
    news: new Array({
      type: mongoose.Schema.Types.ObjectId,
      ref: "news",
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
