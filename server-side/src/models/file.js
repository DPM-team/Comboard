const mongoose = require("mongoose");

const fileSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  binary: {
    type: Buffer,
    required: true,
  },
});

const File = mongoose.model("file", fileSchema);

module.exports = File;
