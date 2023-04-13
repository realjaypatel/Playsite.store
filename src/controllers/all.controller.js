const express = require("express");
const router = express.Router();
const auth = require('../middleware/auth')

const authController = require("./auth.controller");
const addblogController = require("./addblog.controller.js");
const postController = require("./post.controller.js");
const dashController = require("./dashboard.controller.js");
const userController = require("./user.controller.js");
const appController = require("../.././srcf/controllers/app.controller.js");
const analyticsController = require("./analytics.controller.js");

router.use("/auth", (req,res)=>{
    var fullUrl =   req.get('host') ;
    let it =  fullUrl.charAt(fullUrl.length-1)
    if(it == '0'){
     it = "http://example.com:300/auth"
    }else{
     it = "https://playsite.store/auth"
    }
    res.redirect(it)
});
router.use("/blog", addblogController);
router.use("/post", postController);
router.use("/dashboard", dashController);
router.use("/app",appController);
router.use("/user",userController);
router.use("/analytics", analyticsController);
router.get("/",(req,res)=>{
    console.log('//////////////////////////////////////////////////got a faltu req')
    res.redirect('/dashboard')
});


module.exports = router;