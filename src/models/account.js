const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

const accountSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    minlength: 7,
    trim: true,
    required: true,
    validate(value) {
      if (value.includes("password")) {
        throw new Error("Please try a different password!");
      } else if (value.length < 8) {
        throw new Error("Password must contain at least 8 characters");
      } else if (!(value.includes("!") || value.includes("@") || value.includes("*"))) {
        throw new Error("Password must contain at least one special character (!,@,*)");
      }
    },
  },
});

/**
 * Middleware function for password security
 */
accountSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 8);
  }

  next();
});

const Account = mongoose.model("Account", accountSchema);

module.exports = {
  Account,
  accountSchema,
};
