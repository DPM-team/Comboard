const mongoose = require("mongoose");

//Connect to mongoose with comboard database
mongoose.connect(process.env.MONGODB_URL);
