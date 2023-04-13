const express = require("express");
const router = express.Router();
const Userdb = require("../../../../src/models/user.model");
const Postdb = require("../../../../src/models/post.model");
var objectId = require('mongodb').ObjectID;
const jwt = require('jsonwebtoken')
const auth = require('../../../middleware/auth');
// const { request } = require("../..");
const url = "https://hero.us-southeast-1.linodeobjects.com/"





router.get("/:username",auth,async (req, res) => {

    let userid = {}
    try {
        userid = await Userdb.findOne({ name: req.params.username.toLowerCase() });
/**
 * @description following will increase the the number times visits on user account by 1 every time any visits user account page except that user itself
 */
        let totalVisits = userid.visits;
        if (req.user) {
            if (userid._id.toString() !== req.user._id.toString())
                totalVisits = totalVisits + 1;
            console.log(userid.visits);
            console.log("sdasd");
        }
        else {
            console.log("dsfsdf");
            totalVisits = totalVisits + 1;
        }

        userid.visits = totalVisits;
        await userid.save();
        console.log(userid.visits);

           } catch (e) {
            return res.json({msg: "no user with this id exist"})

    }



if(userid == null){
    return res.json({msg: "no user with this id exist"})
}
    let postdata = [];

    try {
        postdata = await Postdb.find({ user: userid._id })
    } catch (e) {

    }
    let isadmin = false;
    try {
isadmin = (userid._id.toString() === req.user._id.toString()) ;
    } catch (e) {

    }

    let data = {
        username:userid.name ,
        userbg:userid.userbg,
        userphoto:userid.userimg,
        verified:userid.verified,
        about: userid.about ,
        isadmin: isadmin,
        visits:userid.visits
    }




return res.render('viewsf/account.ejs',{url:url,data:data,postdata:postdata,postdatasize:postdata.length,userdetails:req.user});




});





module.exports = router;
