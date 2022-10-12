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
