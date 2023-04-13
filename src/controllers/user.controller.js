const express = require("express");
const router = express.Router();
const Userdb = require("../models/user.model");
const Postdb = require("../models/post.model");
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
  





  router.post("/remove-wishlist", async (req, res) => {
    try {
      const data = await User.findByIdAndUpdate(
        req.user._id,
        {
          $pull: { wishlist: req.body.gameId },
        },
        { new: true }
      );
  
      res.send({ data });
    } catch (err) {}
  });
  
  router.post("/add-cart", async (req, res) => {
    try {
      console.log("addcart");
      let userData = await User.findById(req.user._id).lean().exec();
  
      let isPresent = false;
  
      userData.cart.forEach((el) => {
        if (req.body.gameId === el.toString()) {
          isPresent = true;
        }
      });
  
      if (isPresent) {
        res.status(409).json({ message: "Already in wishlist", error: true });
        return;
      }
  
      const data = await User.findByIdAndUpdate(
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
  
  router.post("/add-orders", async (req, res) => {
    try {
      let userData = await User.findById(req.user._id).lean().exec();
  
      let isPresent = false;
  
      userData.orders.forEach((el) => {
        if (req.body.gameId === el.toString()) {
          isPresent = true;
        }
      });
  
      if (isPresent) {
        res.status(409).send({ message: "Already in orders", error: true });
        return;
      }
  
      const data = await User.findByIdAndUpdate(
        req.user._id,
        {
          $push: { orders: [req.body.gameId] },
        },
        { new: true }
      );
      res.send(data);
    } catch (err) {
      res.status(500).send({ err });
    }
  });







    
module.exports = router;
