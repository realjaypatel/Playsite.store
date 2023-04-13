const express = require("express");
const router = express.Router();
 const Userdb = require("../../../../src/models/user.model");
const Postdb = require("../../../../src/models/post.model");
var objectId = require('mongodb').ObjectID;
const jwt = require('jsonwebtoken')
const auth = require('../../../middleware/auth')
const url = "https://hero.us-southeast-1.linodeobjects.com/"


router.get("/new",auth, async (req, res) => {




  return res.render('viewsf/editor/web-editor.ejs');


});


router.get("/",auth, async (req, res) => {




  return res.render('viewsf/editor/web.ejs');


});





module.exports = router;
