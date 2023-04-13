const express = require("express");
const router = express.Router();
const Userdb = require("../models/user.model");
const Postdb = require("../models/post.model");
var objectId = require('mongodb').ObjectID;
const jwt = require('jsonwebtoken')
const auth = require('../middleware/auth');
let url = "https://hero.us-southeast-1.linodeobjects.com/"




router.get("/add-post", auth, async (req, res) => {

    if (!req.user) {
        return res.json({ notlogin: 'not authorized' })
    }


    return res.render('viewsb/add-post.ejs',{userdetails:req.user})



});

router.get("/update-post", auth, async (req, res) => {
    if(!req.query.id){
        res.send('invalid id')
        return;
      }
    if (!req.user) {
        return res.json({ notlogin: 'not authorized' })
    }
    let post = 0
    try {
    

            post = await Postdb.findById( req.query.id)
            console.log("=>",post.user , req.user._id,post.user.equals(req.user._id) );
            if(!post.user.equals(req.user._id)){   
return res.json({msg:"you don't have access to edit this app"})
        }

    } catch (error) {
res.json({msg:error})
    }
    if(!post){


        return res.json({ postnotfound: 'nopost found with this id' })
    }
console.log('===>',post)
    return res.render('viewsb/update_post.ejs',{post:post,url:url,userdetails:req.user})



});

router.get("/add-blog", auth, async (req, res) => {

    if (!req.user) {
        return res.json({ notlogin: 'not authorized' })
    }


    return res.render('viewsb/add-blog.ejs',{userdetails:req.user})



});

router.get("/update-blog", auth, async (req, res) => {
    if(!req.query.id){
        res.send('invalid id')
        return;
      }
    if (!req.user) {
        return res.json({ notlogin: 'not authorized' })
    }
    let post = 0
    try {
    

            post = await Postdb.findById( req.query.id)
            console.log("=>",post.user , req.user._id,post.user.equals(req.user._id) );
            if(!post.user.equals(req.user._id)){   
return res.json({msg:"you don't have access to edit this app"})
        }

    } catch (error) {
res.json({msg:error})
    }
    if(!post){


        return res.json({ postnotfound: 'nopost found with this id' })
    }
console.log('===>',post)
    return res.render('viewsb/update_blog.ejs',{post:post,url:url,userdetails:req.user})



});
router.get("/", auth, async (req, res) => {
    console.log('dash req')
        if (!req.user) {
            console.log('not logged in')
            // return res.redirect('/auth')
            res.render('/auth', {
                errorMessage:''
            })
        }
        let post = 0
        try {
            post = await Postdb.find({ user: req.user._id })
    
        } catch (error) {
    
        }
    
        console.log(post)
    
         return res.render('viewsb/index.ejs', { posts: post ,url:url,userdetails:req.user})
    
    console.log('dash req end')
    
    });


module.exports = router;
