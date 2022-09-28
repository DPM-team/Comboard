const mongoose = require("mongoose");
const validator = require("validator");

const passwordSchema = new mongoose.Schema({
  password: {
    type: String,
    minlength: 7,
    trim: true,
    required: true,
    validate(value) {
      if (value.includes("password")) {
        throw new Error("Please try a different password!");
      }
    },
  },
});

const Password = mongoose.model("Password", passwordSchema);

module.exports = {
  Password,
  passwordSchema,
};
