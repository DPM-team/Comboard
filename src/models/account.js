const mongoose = require("mongoose");

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
