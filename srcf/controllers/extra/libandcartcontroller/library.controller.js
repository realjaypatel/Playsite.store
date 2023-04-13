const express = require("express");
const router = express.Router();
// const Userdb = require("../models/user.model");
const Postdb = require("../../../../src/models/post.model");
var objectId = require('mongodb').ObjectID;
const jwt = require('jsonwebtoken')
const auth = require('../../../middleware/auth')
const url = "https://hero.us-southeast-1.linodeobjects.com/"





router.get("/", auth,async (req, res) => {

  let postdata = [];

  try {
    postdata = await Postdb.find({ _id : { $in : req.user.library } } )
} catch (e) {

}



// console.log(postdata,"postdata");
//  return res.json({data:req.user.cart})
return res.render('viewsf/library.ejs',{url:url,data:postdata,userdetails:req.user});




});





module.exports = router;
