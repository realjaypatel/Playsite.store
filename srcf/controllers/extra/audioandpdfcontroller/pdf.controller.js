const express = require("express");
const router = express.Router();
// const Userdb = require("../models/user.model");
const Postdb = require("../../../../src/models/post.model");
var objectId = require('mongodb').ObjectID;
const jwt = require('jsonwebtoken')
const auth = require('../../../middleware/auth')
const url = "https://hero.us-southeast-1.linodeobjects.com/"





router.get("/:id",auth, async (req, res) => {

let url = req.params.id
  


// console.log(postdata,"postdata");
//  return res.json({data:req.user.cart})
  return res.render('viewsf/pdf.ejs',{url:url});


});





module.exports = router;
