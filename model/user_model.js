const mongoose = require("mongoose");
const moment = require("moment");

const mongoSchema = mongoose.Schema({
  namaLengkap: String,
  username: String,
  password: String,
});

module.exports = mongoose.model("users", mongoSchema);
