const express = require("express");
const app = express();
require("dotenv").config();

const port = process.env.PORT || 3000;

// db connection
require("./startup/db")();

// routes
require("./startup/routes")(app);

app.listen(port, () => {
  console.log(`Listening to port ${port}`);
});
