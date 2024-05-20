require("dotenv").config();
const express = require("express");
const yargs = require("yargs");

const datetimeRoute = require("./routes/datetime.js");
const advertisementRoute = require("./routes/advertisements.js");
const userRoute = require("./routes/users.js");
const logRequests = require("./middlewares/logs.js");

const app = express();

yargs
  .command(
    "debug",
    "Save information about each request to logs.txt file.",
    () => {},
    () => {
      app.use(logRequests);
    }
  )
  .help().argv;

app.use("/heartbeat", datetimeRoute);
app.use("/advertisement", advertisementRoute);
app.use("/user", userRoute);
app.all("*", (req, res) => {
  res.status(404);
  res.sendFile(__dirname + "/static/404.jpg");
});
app.listen(process.env.SERVER_PORT, console.log("server started"));
