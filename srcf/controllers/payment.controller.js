const express = require("express");
const router = express.Router();
// const Userdb = require("../models/user.model");
const Postdb = require("../../src/models/post.model");
var objectId = require('mongodb').ObjectID;
const jwt = require('jsonwebtoken')
const auth = require('../middleware/auth')
const url = "https://hero.us-southeast-1.linodeobjects.com/";
const Razorpay = require('razorpay'); 
var instance = new Razorpay({
  key_id: "rzp_test_uSA4CqFukBlbrp",
  key_secret: "rcexqMWGVCTE8TKs2IBdhjft"
});




router.get("/", auth,async (req, res) => {


return res.render('viewsf/payment.ejs',{url:url,data:"a"});




});

router.post('/create/orderId',(req,res) => {
  // console.log("creating order Id",req.body)
  let options = {
      amount: 300,
      currency: "INR",
      receipt:"order1"
  }
  
  instance.orders.create(options, (err, result) => {
      console.log(result)
      res.send({orderId:result.id});
  })
  })

// {
//     "razorpay_payment_id": "pay_29QQoUBi66xm2f",
//     "razorpay_order_id": "order_9A33XWu170gUtm",
//     "razorpay_signature": "9ef4dffbfd84f1318f6739a3ce19f9d85851857ae648f114332d8401e0949a3d"
//   }
 router.post("/api/payment/verify",(req,res)=>{

      let body=req.body.razorpay_order_id + "|" + req.body.razorpay_payment_id;

       var crypto = require("crypto");
      var expectedSignature = crypto.createHmac('sha256', 'rcexqMWGVCTE8TKs2IBdhjft')
                                      .update(body.toString())
                                      .digest('hex');

      var success =false;
      if(expectedSignature === req.body.razorpay_signature){
       success=true;
      }
           res.json({success : success});
        //  res.json({success : body});
 });






























module.exports = router;
