const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    surname: {
      type: String,
      required: true,
    },
    telephone: {
      type: String,
      required: false,
    },
    address: {
      type: String,
      required: false,
    },
    specialization: {
      type: String,
      required: false,
    },
    gender: {
      type: String,
      required: false,
    },
    birthday: {
      type: Date,
      required: false,
    },
    profilePhoto: {
      type: Buffer,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

const Profile = mongoose.model("Profile", profileSchema);

module.exports = {
  Profile,
  profileSchema,
};
