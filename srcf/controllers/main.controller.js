const express = require("express");
const router = express.Router();
// const Userdb = require("../models/user.model");
const Postdb = require("../../src/models/post.model");
const Userdb = require("../../src/models/user.model");
var objectId = require('mongodb').ObjectID;
const jwt = require('jsonwebtoken')
const auth = require('../middleware/auth')

const latestPost = require("../game_posts/latest.json");
const posts = require("../game_posts/posts.json");

const postCarousel = require("../game_posts/post3.json");




router.get("/", auth,async (req, res) => {
  // console.log("maincontroller",req.user)
  // console.log(latestPost);

  let post = 0
  try {
      // post = await Postdb.find()

  } catch (error) {
    return res.json( { invalid_id: 'invalid request : maincontroller'  })

  }


//  res.json(post)

//  return res.render('viewsf/in2.ejs', { posts: post })
  let post1 = latestPost;
  let post2 = posts;
  // console.log(post2.length);
















  let post4 = []


  // console.log(postCarousel.length);
  let recentViewed = [];
  try {
    post4 = await Postdb.find().sort('-date').limit(25);
    
    if (req.user && req.user.recentVisits.length > 5) {
      // console.log(req.user.recentVisits);
      recentViewed = await Postdb.find({ _id: { $in: req.user.recentVisits } })

    }
if(!recentViewed) {
  recentViewed = [];
}
 } catch (error) {
 }



// console.log(postCarousel);
  return res.render('viewsf/in2.ejs',
    {
      title: "Playsite",
      post1: post1,
      post2: post4,
      post3: postCarousel,
      post4:post4,
      userdetails: req.user,
      recentViewed:recentViewed
    }

    
    )


});




module.exports = router;
