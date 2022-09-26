const mongoose = require("mongoose");

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
});

const Account = mongoose.model("Account", accountSchema);

module.exports = {
  Account,
  accountSchema,
};
