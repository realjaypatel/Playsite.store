const express = require("express");
const router = express.Router();
 const Userdb = require("../../src/models/user.model");
const Postdb = require("../../src/models/post.model");
var objectId = require('mongodb').ObjectID;
const jwt = require('jsonwebtoken')
const auth = require('../middleware/auth')



    
router.get("/", auth,async (req, res) => {


    res.render('viewsf/all/index.ejs')

});
   








module.exports = router;
