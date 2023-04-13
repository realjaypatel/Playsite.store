const express = require("express");
const router = express.Router();
 const Userdb = require("../../../../src/models/user.model");
const Postdb = require("../../../../src/models/post.model");
var objectId = require('mongodb').ObjectID;
const jwt = require('jsonwebtoken')
const auth = require('../../../middleware/auth')
const url = "https://hero.us-southeast-1.linodeobjects.com/"





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
let filetype = ""
try{
  //  filetype =  post._doc.gameFile.split('.')[1]
  filetype = post._doc.gameFile.substr(post._doc.gameFile.lastIndexOf(".") + 1)
}catch(e){
  console.log(e);
}


audioimg = post._doc.thumbnail
if(post._doc.thumbnail){
  audioimg = url +post._doc.thumbnail;
}else if(post._doc.logo){
  audioimg = url+post._doc.logo;
}else{
  audioimg = 'https://t4.ftcdn.net/jpg/04/00/24/31/360_F_400243185_BOxON3h9avMUX10RsDkt3pJ8iQx72kS3.jpg'
}



audiodata =   {
Id:post._doc._id,
urldata: url,
title: post._doc.title,
logo: audioimg,
downloadLink:post._doc.gameFile,
developer: username,
date:post.date,
filetype:filetype,
description:post._doc.about,
aboutGame:post._doc.about,


}



  return res.render('viewsf/audio.ejs',{url:post._doc._id,audiodata : audiodata});


});





module.exports = router;
