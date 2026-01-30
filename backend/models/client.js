const mongoose = require("mongoose");

const clientSchema = new mongoose.Schema({
  image: String,
  name: String,
  description: String,
  designation: String
});

module.exports = mongoose.model("Client", clientSchema);