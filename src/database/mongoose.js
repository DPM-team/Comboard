const mongoose = require("mongoose");

//Connect to mongoose with comboard database
mongoose.connect(process.env.MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true });

// Get the default connection to handle the error in connection
const database = mongoose.connection;

// Bind connection to error event (to get notification of connection errors)
database.on("error", function () {
  console.error(console, "MongoDB connection error:");
});
