const express = require("express");
const router = express.Router();
const Userdb = require("../../../../src/models/user.model");
const Postdb = require("../../../../src/models/post.model");
var objectId = require('mongodb').ObjectID;
const jwt = require('jsonwebtoken')
const auth = require('../../../middleware/auth')

var gplay = require('google-play-scraper');




    
router.get("/:id", auth,async (req, res) => {









  if(!req.params.id){
      res.send('invalid id')
      return;
    }




  let url1 = "https://d.apkpure.com/b/APK/"

  let url2 = "?version=latest"
let value = {title:'a'}
  try{
  let value =  await gplay.app({appId: req.params.id})
  console.log("title>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>",value.title)
  game2 =   {
    id:req.params.id,
    url: "hello",
    title: value.title,
    thumbnail:value.headerImage,
    logo: value.icon,
    ytLink:value.video,
    downloadLink:url1+req.params.id+url2,
    filetype:"apk",
    downloadno: value.installs,
    rates:value.scoreText,
    ratingsno:value.ratings,
    histogram:value.histogram,
    cart:"cartvar",
    ownit:"ownitvar",
    cardImage:
      "https://cdn1.epicgames.com/offer/fn/19BR_KeyArt_EGS_Launcher_Blade_1200x1600_1200x1600-b49da2ae039bd0adb44171318c91787b?h=854&resize=1&w=640",
    cardTagline: "Luden.io | Nival",
    price: { mainPrice: 200, discountedPrice: 200, discount: 0 },
    developer: value.developer,
    publisher: "Epic Games",
    date:"date",
    releaseDate: "Jul 25, 2017",
    platform: ["Android"],
    description:value.description,
    genres: ["Action", "Shooter"],
    features: ["co-op", "multiplayer", "single-player", "controller-support"],
    tags: ["Free"],
    aboutGame:value.description,
    gameFeatures: "here comes the features if any",
    heroImages: value.screenshots,
    images:value.screenshots,
    rating: {
      criticRecommend: 100,
      topCriticAverage: 93,
      openCriticrating: "Mighty",
    },
    reviews: [
      {
        organisation: "IGN",
        author: "Austen Goslin",
        rating: 8.5,
        description:
          "Thanks to the freedom of its outstanding building mechanic, Fortnite Battle Royale isn't just a great battle royale game – it's one of the best multiplayer games in recent history.",
        link: "https://opencritic.com/",
      },
      {
        organisation: "GamesRadar+",
        author: "GamesRadar+",
        rating: 9.5,
        description:
          "Nobody thought Fortnite would still be popular this late on, but it's continued to adapt and fight for its spot at the top of the battle royale ladder.",
        link: "https://opencritic.com/",
      },
      {
        organisation: "Digital Trends",
        author: "Dewan Zawad",
        rating: 9.5,
        description:
          "Nothing offers the lighthearted, fun for all ages battle royale that Fortnite does..",
        link: "https://opencritic.com/",
      },
    ],
  }


  return res.render('viewsf/android.ejs', {title:game2.title, data: game2,userdetails:req.user, value:value })

}catch(err){
    res.send('invalid app id: ' + req.params.id)
  }



//   viewsf/android/android.ejs

//  return res.render('viewsf/app1.ejs', { data: post._doc , username: username })




});


   






module.exports = router;




