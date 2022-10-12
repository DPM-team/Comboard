const mongoose = require("mongoose");
const validator = require("validator");

const accountSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
    trim: true,
    validate: function (value) {
      if (!validator.isEmail(value)) {
        throw new Error("Wrong email format!");
      }
    },
  },
  password: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Password",
  },
});

const Account = mongoose.model("Account", accountSchema);

module.exports = {
  Account,
  accountSchema,
};
