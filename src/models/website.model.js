const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const websiteSchema = new mongoose.Schema({
  link: { type: String },

});


module.exports = mongoose.model("website", websiteSchema);
