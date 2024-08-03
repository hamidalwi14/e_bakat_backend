"use strict";

const express = require("express");
const app = express();
const logger = require("morgan");
const router = express.Router({ mergeParams: true });
const port = process.env.PORT || 5050;
const http = require("http");
const server = http.createServer(app);
const setUp = require("./setup");
const moment = require("moment-timezone");
const cors = require("cors");
require("./routes/users")(router);
// require("./routes/r_pengeluaran")(router);
app.use(cors());
app.options("*", cors());
app.use(
  express.urlencoded({
    enableTypes: ["json", "form"],
    extended: true,
  })
);
app.use(
  express.json({
    extended: true,
  })
);
app.use(logger("dev"));
app.use("/", router);
server.listen(port);
server.on("listening", onListening);

async function onListening() {
  try {
    console.log("try to listen...");
    var addr = server.address();
    var bind = typeof addr === "string" ? "pipe " + addr : "port " + addr.port;
    setUp.dbConnect();
    console.log("Listening on " + bind);
  } catch (error) {
    console.log(error);
    console.log("listen failed, try to reconnect in 5 secs...");
    setTimeout(function() {
      onListening();
    }, 5000);
  }
}
