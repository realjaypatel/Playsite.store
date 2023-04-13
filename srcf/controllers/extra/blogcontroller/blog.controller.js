const express = require("express");
const router = express.Router();
// const Userdb = require("../models/user.model");
const Postdb = require("../../../src/models/post.model");
var objectId = require('mongodb').ObjectID;
const jwt = require('jsonwebtoken')
const auth = require('../../middleware/auth')
const url = "https://hero.us-southeast-1.linodeobjects.com/"



router.get("/add", async (req, res) => {

    res.render("viewsf/blog/blogeditor.ejs")
    
    });

router.get("/view", async (req, res) => {

    res.render("viewsf/blog/blogpage.ejs")
    
    });


router.get("/", async (req, res) => {

res.render("viewsf/blog/blog.ejs")

});



    




module.exports = router;
