const express = require("express");
const router = express.Router();
const Userdb = require("../models/user.model");
const Postdb = require("../models/post.model");
const jwt = require('jsonwebtoken')
const auth = require('../middleware/auth');
let url = "https://hero.us-southeast-1.linodeobjects.com/"



router.get("/", auth, async (req, res) => {
// res.json({a:'a'})
     res.render("viewsb/analytics.ejs",{userdetails:req.user})
    });


module.exports = router;
