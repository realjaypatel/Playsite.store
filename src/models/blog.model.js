const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");


const blogSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users'
  },
  date: { type: Date, default: Date.now },
  title: { type: String },
   logo: { type: String },
   about: { type: String },
  
});


module.exports = mongoose.model("blog", blogSchema);
