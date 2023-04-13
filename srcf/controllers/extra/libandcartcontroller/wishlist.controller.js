const express = require("express");
const router = express.Router();
// const Userdb = require("../models/user.model");
const Postdb = require("../../../../src/models/post.model");
var objectId = require('mongodb').ObjectID;
const jwt = require('jsonwebtoken')
const auth = require('../../../middleware/auth')
const url = "https://hero.us-southeast-1.linodeobjects.com/"





router.get("/", async (req, res) => {

  // console.log(req.query.id);
  
  //=>code which render home search page
  // if(!req.query.id){
  //   data = []
      
  //     return  res.render('viewsf/search.ejs', { data: data,query:'' });
  //   }else 




if(!req.query.id){
      console.log('all search')
      let post = 0



      try {
         post = await Postdb.find().sort('-date').limit(10)
 
     } catch (error) {
       return res.json( { invalid_id: 'invalid id : '+req.query.id + error })
 
     }



      return res.render('viewsf/search.ejs', { data: post, url:url, query:req.query.id })

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
 console.log('post',post);
//  res.json(post);
       return res.render('viewsf/search.ejs', { data: post, url:url, query:req.query.id })





    // res.render("doctor/dashboard.ejs")

});





module.exports = router;
