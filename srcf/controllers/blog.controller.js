const express = require("express");
const router = express.Router();
 const Userdb = require("../../src/models/user.model");
const Postdb = require("../../src/models/post.model");
var objectId = require('mongodb').ObjectID;
const jwt = require('jsonwebtoken')
const auth = require('../middleware/auth')



    
router.get("/:id", auth,async (req, res) => {









  if(!req.params.id){
      res.send('invalid id')
      return;
    }
    let post = 0
    let username = {name:""};

  try {
      
    /**
     * @description it stores the number of visits for a post 
     */
      post = await Postdb.findById(req.params.id)
      post.visits = post.visits + 1;
      // console.log(post.visits);
    p = await post.save();
    console.log(p);
    
    // console.log(req.user);
      if (req.user) {
        let newRecentVisits = user.recentVisits.filter((item) => {
          return item.toString() !== post._id.toString();
        })
        // console.log(newRecentVisits);
        user.recentVisits = newRecentVisits;
        user.recentVisits.push(objectId(post._id));
        console.log(user.recentVisits);
        if (user.recentVisits.length > 20)
          user.recentVisits.shift();
        await user.save();
      }
      
      // console.log(user.recentVisits);
    } catch (error) {
      return res.json( { invalid_id: 'invalid id : '+req.params.id  })

    }


    try {
       username= await Userdb.findById(post.user);
       username= username.name;
  } catch (error) {

  }


  let cartvar ="Add To Cart";
  let ownitvar = "Add To Library"
  try{


  for(let x =0;x < req.user.cart.length;x++) {
    if(req.user.cart[x] == req.params.id) {
      
      cartvar = "Already In Cart";
      break;
    }
  }
} catch(e){

}
try{


  for(let x =0;x < req.user.library.length;x++) {
    if(req.user.library[x] == req.params.id) {
      
      ownitvar = "Already in Library";
      break;
    }
  }
} catch(e){

}


  let url = "https://hero.us-southeast-1.linodeobjects.com/"

  let filetype = ""
  try{
    //  filetype =  post._doc.gameFile.split('.')[1]
    filetype = post._doc.gameFile.substr(post._doc.gameFile.lastIndexOf(".") + 1)
  }catch(e){
    console.log(e);
  }


  
  game2 =   {
    id:post._doc._id,
    url: url,
    title: post._doc.title,
    thumbnail:post._doc.thumbnail,
    logo: post._doc.logo,
    ytLink:post._doc.ytLink,
    downloadLink:post._doc.gameFile,
    filetype:filetype,
    downloadno: post._doc.downloadNumber,
    rates:post._doc.rates,
    cart:cartvar,
    ownit:ownitvar,
    cardImage:
      "https://cdn1.epicgames.com/offer/fn/19BR_KeyArt_EGS_Launcher_Blade_1200x1600_1200x1600-b49da2ae039bd0adb44171318c91787b?h=854&resize=1&w=640",
    cardTagline: "Luden.io | Nival",
    price: { mainPrice: 200, discountedPrice: 200, discount: 0 },
    developer: username,
    publisher: "Epic Games",
    date:post.date,
    releaseDate: "Jul 25, 2017",
    platform: [post._doc.platform],
    description:post._doc.about,
    genres: ["Action", "Shooter"],
    features: ["co-op", "multiplayer", "single-player", "controller-support"],
    tags: ["Free"],
    aboutGame:post._doc.about,
    gameFeatures: "here comes the features if any",
    heroImages: post.images,
    images: post.images,
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
  // console.log(game2);
// res.json({a:post,b:post.platform})
// post._doc
  return res.render('viewsf/blog.ejs', {title:game2.title, data: game2,userdetails:req.user })



//  return res.render('viewsf/app1.ejs', { data: post._doc , username: username })




});

router.get("/", async (req, res) => {

    res.json({requireId: true})
    });

 router.post('/rate/:id', async (req, res, next) => {
  let p
  try {
    const post = await Postdb.findById(req.params.id);
    if (post.rates.length === 0)
      post.rates = [0, 0, 0, 0, 0];
    if (req.body.rating > 5 || req.body.rating < 1) {
      return;
    }

    post.rates[req.body.rating] += 1;
    p = await post.save();
  } catch (error) {
    
  }
  //return array
  console.log(p.rates);
  return res.json({rating: p.rates});
})



module.exports = router;
