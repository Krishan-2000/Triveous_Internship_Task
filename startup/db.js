const mongoose = require("mongoose");
require("dotenv").config();

module.exports = function () {
  mongoose
    .connect(process.env.MONGODB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("Database connected to localhost 27017...");
    })
    .catch((err) => {
      console.error("Connection failed...", err);
      throw err;
    });
};
