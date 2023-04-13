const express = require("express");
const router = express.Router();
// const Userdb = require("../models/user.model");
const Postdb = require("../../src/models/post.model");
var objectId = require('mongodb').ObjectID;
const jwt = require('jsonwebtoken')
const auth = require('../middleware/auth')
const url = "https://hero.us-southeast-1.linodeobjects.com/"
var gplay = require('google-play-scraper');




router.get("/", auth,async (req, res) => {

  if(req.query.type){
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
return res.render('viewsf/search.ejs', {title: "Browse Apps and Games", data: post, url:url, query:req.query.type,userdetails:req.user,value:[]})

  }
  











if(!req.query.id){
      console.log('all search')
      let post = 0



      try {
         post = await Postdb.find().sort('-date').limit(10)
 
     } catch (error) {
       return res.json( { invalid_id: 'invalid id : '+req.query.id + error })
 
     }


console.log(post)
      return res.render('viewsf/search.ejs', {title: "Browse Apps and Games", data: post, url:url, query:req.query.id,userdetails:req.user,value:[]})

    }
    let post = 0
   let regex = 0
    try {
       regex = new RegExp(req.query.id , 'i')
        post = await Postdb.find({
          "$or": [
            {"title":{$regex:regex}}
          ]
         })

    } catch (error) {
      return res.json( { invalid_id: 'invalid id : '+req.query.id  })

    }

    let value = []

    try{
  let value = await  gplay.search({ term:req.query.id ,
      num: 10
    })
  return res.render('viewsf/search.ejs', {title:"Browse Apps and Games", data: post, url:url, query:req.query.id,userdetails:req.user,value:value })

  }catch (error) {
    return res.render('viewsf/search.ejs', {title:"Browse Apps and Games", data: post, url:url, query:req.query.id,userdetails:req.user,value:[] })

  }
    
 });

// router.get("/filters", async (req, res) => {
//   try {
//     const id = req.query.price;
//     let type = req.query.genre?.split(",");
//     // let features = req.query.features?.split(",");
//     let platforms = req.query.platforms?.split(",");

//     if (platforms[0] === "") {
//       platforms = ["Windows", "Mac"];
//     }

//     if (features[0] === "") {
//       features = [
//         "single-player",
//         "multiplayer",
//         "controller-support",
//         "co-op",
//         "competitive",
//       ];
//     }

//     if (genre[0] === "") {
//       genre = [
//         "Action",
//         "Fighting",
//         "Indie",
//         "Puzzle",
//         "Strategy",
//         "Horror",
//         "Survival",
//         "Casual",
//         "Shooter",
//         "Adventure",
//       ];
//     }

//     let underMinAmount = parseInt(price) || 100000000;

//     let data = await Games.find({
//       $and: [
//         { genres: { $in: genre } },
//         { features: { $in: features } },
//         { "price.discountedPrice": { $lt: underMinAmount } },
//         { platform: { $in: platforms } },
//       ],
//     });

//     res.send({ data });
//   } catch (err) {
//     res.status(500).send({ err });
//   }
// });



module.exports = router;
