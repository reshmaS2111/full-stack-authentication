// external imports
const mongoose = require("mongoose");
require("dotenv").config();

async function dbConnect() {
  // using mongoose to connect this app to our database on mongoDB using the DB_URL (connection string)
  mongoose
    .connect(process.env.DB_URL, {
      // these are options to ensure that the connection is done properly
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("Connected to MongoDB Atlas");
    })
    .catch((error) => {
      console.log("Failed to connect to MongoDB Atlas");
      console.log(error);
    });
}

module.exports = dbConnect;
