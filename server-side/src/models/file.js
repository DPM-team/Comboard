const mongoose = require("mongoose");

const fileSchema = mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    unique: true,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  binary: {
    type: Buffer,
  },
});

const File = mongoose.model("file", fileSchema);

module.exports = File;
