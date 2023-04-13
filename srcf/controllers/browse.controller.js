const express = require("express");
const router = express.Router();
// const Userdb = require("../models/user.model");
const Postdb = require("../../src/models/post.model");
var objectId = require('mongodb').ObjectID;
const jwt = require('jsonwebtoken')
const auth = require('../middleware/auth')
const url = "https://hero.us-southeast-1.linodeobjects.com/"
// const posts = require("../explore_posts/web.json");
// const object = require("../explore_posts/object.json");




router.get("/", auth,async (req, res) => {
      if(!req.query.type){
            let post = 0;
            try {
               post = await Postdb.find().sort('-date').limit(10)
           } catch (error) {
             return res.json( { invalid_id: 'invalid id : '+req.query.type + error })
            }
            // return res.render('viewsf/browse/webbrowse.ejs', {title: "Browse Apps and Games", data: posts, url:url, query:req.query.id,userdetails:req.user})


            return res.render('viewsf/browse/webbrowse.ejs', {title: "Browse Apps and Games", data: post, url:url, query:req.query.type,userdetails:req.user})
      
          }
          let post = 0
         let regex = 0
          try {
             regex = new RegExp(req.query.type , 'i')
              post = await Postdb.find({
                "$or": [
                  {"gameFile":{$regex:regex}}
                ]
               })
      
          } catch (error) {
            return res.json( { invalid_id: 'invalid id : '+req.query.type  })
      
          }
       console.log('post  ',post);
 return res.render('viewsf/browse/webbrowse.ejs', {title: "Browse Apps and Games", data: post, url:url, query:req.query.type,userdetails:req.user})



      
});




module.exports = router;
