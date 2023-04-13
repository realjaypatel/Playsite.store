const express = require("express");
const router = express.Router();
// const Userdb = require("../models/user.model");
const Postdb = require("../../src/models/post.model");
var objectId = require('mongodb').ObjectID;
const jwt = require('jsonwebtoken')
const auth = require('../middleware/auth')
const url = "https://hero.us-southeast-1.linodeobjects.com/"
const posts = require("../explore_posts/web.json");




let allposts = []



try{
      const fs = require('fs');
let directoryPath = './uploads/'
fs.readdir(directoryPath, function (err, files1) {

      files1.forEach(function (file1) {
console.log("=====")
        console.log(file1); 

        let directoryPath = './uploads/'+file1
        fs.readdir(directoryPath, function (err, files2) {
if(err){
      console.log("====="+err)
      return
}
            //listing all files using forEach
            files2.forEach(function (file2) {
        
                  allposts.push(file1+'/'+file2);
                console.log(file1+'/'+file2); 
                
            });
        });
    });
});

}
catch(e){}



















router.get("/", auth,async (req, res) => {


      let post = posts




      return res.render('viewsf/browse/webbrowse.ejs', {title: "Browse Apps and Games", data: post, allposts:allposts, url:url, query:req.query.id,userdetails:req.user})

});





module.exports = router;
