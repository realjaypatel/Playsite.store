const express = require("express");
const router = express.Router();
const Userdb = require("../../../../src/models/user.model");
const Postdb = require("../../../../src/models/post.model");
var objectId = require('mongodb').ObjectID;
const jwt = require('jsonwebtoken')
const auth = require('../../../middleware/auth')
const url = "https://hero.us-southeast-1.linodeobjects.com/"
const fileUpload = require("express-fileupload");
const fs = require('fs');
const aws = require('aws-sdk');
const multerS3 = require('multer-s3');
const config = require('dotenv').config();
const { check, validationResult } = require('express-validator')


var AWS = require('aws-sdk');
var accessKeyId = process.env.ACCESS_LINODE_KEY
var secretAcessKey = process.env.ACCESS_LINODE_SECRET_KEY
AWS.config.update({
  "secretAccessKey": "gHBhvkda7Fnq5RzaBrEBuhnZB84lvUuWTgNFKuin",
  "accessKeyId": 'WUO7MAQ2CBSJTUVND9XD',
  region: 'us-southeast-1'
});
const spacesEndpoint = new AWS.Endpoint('us-southeast-1.linodeobjects.com');
let s3 = new AWS.S3({
  endpoint: spacesEndpoint
});





let s3fileuploader = async (d) => {

  if (d == null) {
    throw Error('no file')
  }



  console.log('>>>>>>>>>>>>>>>>>>>>>>>running s3 file uploader', d == null, "/d")

  file = d;
  filename = `${Date.now()}-${Math.floor(10000000 + Math.random() * 90000000)}` + file.name
  filename = filename.replace(/[^a-zA-Z0-9.]/g, '')
  console.log("??????????????????????????????????", file);

  // Binary data base64
  const fileContent = Buffer.from(file.data, 'binary');

  // Setting up S3 upload parameters
  const params = {
    ACL: "public-read",
    Bucket: 'hero',
    Key: filename, // File name you want to save as in S3
    Body: fileContent
  };

  // Uploading files to the bucket
  let k = await s3.upload(params, function (err, data) {
    if (err) {

      throw err;
    }
    console.log("??????????????????????????????????", data)


  });
  return filename;

}
let s3filedelete = async (d) => {

  try {
    const filename = d;
    await s3.deleteObject({ Bucket: "hero", Key: filename }).promise();
    console.log("??????????????????????????????????", "file deleted successfully");
    return "file deleted successfully"
  } catch (error) {
    console.log(">>>>>>>>>>>>>>>>>.", error)
  }




}


















router.get("/", auth, async (req, res) => {

  if (!req.user) {
    return res.json({ error: "need to login to edit your account" })
  }

  userdata = {
    id: req.user._id,
    name: req.user.name,
    about: req.user.about,
    userimg: req.user.userimg,
    userbg: req.user.userbg,

  }

  return res.render('viewsf/editaccount.ejs', { user: userdata, url: url, error: '',userdetails:req.user });




});


router.post('/:id', check('title', "name is required ")
  .isLength({ min: 1 })
  .custom((value) => {
    if (value.indexOf(' ') >= 0) {
      throw new Error('username must not contain spaces')
    }
    return true;
  }),
  auth,
  async (req, res, next) => {

    if (!req.user) {
      return res.json({ msg: req.user, msg2: 'not allowed' })
    }


    userdata = {
      id: req.user._id,
      name: req.user.name,
      about: req.user.about,
      userimg: req.user.userimg,
      userbg: req.user.userbg,

    }

    let errors = validationResult(req);
    // console.log(errors);
    
    if (!errors.isEmpty()) {
      return res.render('viewsf/editaccount.ejs',
        {
          user: userdata,
          url: url,
          error: "username should not contain spaces and not empty",
          userdetails:req.user
        });
    }

    if (!req.body) {
      return res.send({ message: "Data to update can not be empty" })
    }
    const name = req.body.title.toLowerCase();
    const about = req.body.about.trim();

    const username = await Userdb.findOne({ name: name })
    /**
     *  @description check if the username is already exists and if it exists return 
       
     */

    console.log("this is name  ", req.body.title);

    // console.log(username);
    // console.log(req.user);
    if (username && username._id.toString() !== req.user._id.toString()) {
      return res.render('viewsf/editaccount.ejs',
        {
          user: userdata,
          url: url,
          error: "username already taken",
          userdetails:req.user
        });
    }

    try {
      const user = await Userdb.findById(req.params.id)

      if (!user) {
        return res.json({ postnotfound: "user not found" })
      }
      let updated_data = user
      updated_data.name = name
      updated_data.about = about

      if (req.files) {



        try {


          logo = await s3fileuploader(req.files.userimg)
          console.log('deleting update logo')
          s3filedelete(user.userimg)
          updated_data.userimg = logo
          console.log('logo', logo)
        } catch (error) {
          console.log('logo error', error)
        }

        try {

          thumbnail = await s3fileuploader(req.files.userbg)
          s3filedelete(user.userbg)
          console.log('++++++++++++>', thumbnail)
          updated_data.userbg = thumbnail
        } catch (error) {

        }



      } else {

      }











      if (req.params.id == req.user._id.toString()) {

        await Userdb.update({ _id: req.user._id }, { $set: updated_data })

        await new Promise(resolve => setTimeout(resolve, 1000));

        return res.redirect('/editaccount')
      } else {
        return res.json({ notauthorised: 'access denied :- not by owner' })
      }































    } catch (error) {
      return res.json({ err: error, main: "mainerr" })
    }


  })


module.exports = router;
