const express = require("express");
const router = express.Router();
const Userdb = require("../../src/models/user.model");
const Postdb = require("../../src/models/post.model");
var objectId = require('mongodb').ObjectID;
const jwt = require('jsonwebtoken')
const auth = require('../middleware/auth')
const path = require("path")















router.get("/:id", async (req, res) => {
  post = '';
  username= ""
    try {
       post = await  Postdb.findById(req.params.id)
       username= await Userdb.findById(post.user);
       console.log(post.username);

    } catch (error) {
      return res.json({err: error,msg:'no post with that id found'})
    }

  return res.json(post)
  


  });
  





  router.post("/remove-cart",auth, async (req, res) => {
    try {
      console.log(req.body.gameId,req.user._id)
      const data = await Userdb.findByIdAndUpdate(
        req.user._id,
        {
          $pull: { cart: req.body.gameId },
        },
        { new: true }
      );
  
      res.send({ data });
    } catch (err) {
      res.send({err:err})
    }
  });
  
  router.post("/add-cart", auth,async (req, res) => {

    try {
      console.log("addcart",req.body);
      let userData = await Userdb.findById(req.user._id).lean().exec();
  
      let isPresent = false;
  
      userData.cart.forEach((el) => {
        if (req.body.gameId === el) {
          isPresent = true;
        }
      });
  
      if (isPresent) {
        res.json({ message: "Already in cart", error: true });
        return;
      }
  
      const data = await Userdb.findByIdAndUpdate(
        req.user._id,
        {
          $push: { cart: [req.body.gameId] },
        },
        { new: true }
      );
      res.send(data);
    } catch (err) {
      console.log(err);
      res.status(500).send({ err });
    }
  });
  
  router.post("/add-library", auth,async (req, res) => {
    try {
      console.log("addlibrary",req.user);
      let userData = await Userdb.findById(req.user._id).lean().exec();
  
      let isPresent = false;
  
      userData.cart.forEach((el) => {
        if (req.body.gameId === el) {
          isPresent = true;
        }
      });
  
      if (isPresent) {
        res.json({ message: "Already in library", error: true });
        return;
      }
  
      const data = await Userdb.findByIdAndUpdate(
        req.user._id,
        {
          $push: { library: [req.body.gameId] },
        },
        { new: true }
      );
      res.send(data);
    } catch (err) {
      console.log(err);
      res.status(500).send({ err });
    }
  });







    
module.exports = router;
