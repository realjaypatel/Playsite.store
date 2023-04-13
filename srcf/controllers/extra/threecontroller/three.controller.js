const express = require("express");
const router = express.Router();
 const Userdb = require("../../../../src/models/user.model");
const Postdb = require("../../../../src/models/post.model");
var objectId = require('mongodb').ObjectID;
const jwt = require('jsonwebtoken')
const auth = require('../../../middleware/auth')
const url = "https://hero.us-southeast-1.linodeobjects.com/"




router.get("/view",auth, async (req, res) => {

  
  

  return res.render('viewsf/three/threeuploadfile.ejs',{});

  });
  

router.get("/",auth, async (req, res) => {


  return res.render('viewsf/three/threeupload.ejs',{});

  });
  
  
router.get("/:id",auth, async (req, res) => {


if(!req.params.id){
  res.send('invalid id')
  return;
}
let post = 0
let username = {name:""};

try {
    post = await Postdb.findById(req.params.id)

} catch (error) {
  return res.json( { invalid_id: 'invalid id : '+req.params.id  })

}


try {
   username= await Userdb.findById(post.user);
   username= username.name;
} catch (error) {

}




threedata =   {
Id:post._doc._id,
urldata: url,
title: post._doc.title,
downloadLink:post._doc.gameFile,
developer: username,
date:post.date,
description:post._doc.about,
aboutGame:post._doc.about,


}



return res.render('viewsf/three/three.ejs',{url:post._doc._id,threedata : threedata});


});





module.exports = router;
