const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

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

/**
 * Middleware function for password security
 */
passwordSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 8);
  }

  next();
});

const Password = mongoose.model("Password", passwordSchema);

module.exports = {
  Password,
  passwordSchema,
};
