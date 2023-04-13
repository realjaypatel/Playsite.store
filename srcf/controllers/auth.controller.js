const express = require("express");
const router = express.Router();
const { check, body, validationResult } = require('express-validator');
const Userdb = require("../models/user.model");
// let sitedomain = ".example.com:300"



router.post("/register",
   check('name','Name is required of minimum length 1')
   .isLength({ min: 1 }),
  check('email', 'Email is required')
    .isEmail(),
  check('password', 'Password is required')
    .isLength({ min: 1 })
  , async (req, res) => {
    
    let errors = validationResult(req);
    console.log(errors);
    if (!errors.isEmpty()) {
      return res.status(422).render('auth', {
        errorMessage: errors.array()[0].msg,
        doctitle:"signup"
      })
    }
    try {
      const email = req.body.email;
      useremail = await Userdb.findOne({ email: email });

    } catch (error) {

    }
    if (useremail) {
      return res.render('auth',
        { errorMessage: 'email already in use' ,
        doctitle:"signup"})
    }

    try {
      const user = new Userdb(
        req.body
      )
      const registered = await user.save();


      console.log('a')
      const token = await registered.generateAuthToken();
      var fullUrl =   req.get('host') ;
      let it =  fullUrl.charAt(fullUrl.length-1)
      if(it == '0'){
       it = ".example.com:300"
      }else{
       it = ".playsite.store"
      }

      res.cookie("jwt", token, {
           domain: it,
        expires: new Date(Date.now() + (1000 * 60 * 60 * 24 * 30)),
        httpOnly: true
      })

















      return res.redirect('/dashboard');
    }
    catch (err) {
      return res.send(err)
    }
  });
router.post("/login",
check('email', 'Valid email is required')
    .isEmail(),
  check('password', 'Password is required')
    .isLength({ min: 1 }),
  async (req, res) => {

    console.log('======>>>>>>>>>>>>>>>>>>>hello world')

    let errors = validationResult(req);
    console.log(errors);
    if (!errors.isEmpty()) {
      return res.status(422).render('auth', {
        errorMessage: errors.array()[0].msg,
        doctitle:"login"
      })
    }

    try {
      console.log(req.body)
      const email = req.body.email;
      const password = req.body.password;

      const useremail = await Userdb.findOne({ email: email });
      if (useremail) {
        // console.log(useremail)
        console.log(useremail.password)
        if (useremail.password == password) {
          console.log('a101')
          const token = await useremail.generateAuthToken();
          var fullUrl =   req.get('host') ;
          let it =  fullUrl.charAt(fullUrl.length-1)
          if(it == '0'){
           it = ".example.com:300"
          }else{
           it = ".playsite.store"
          }
console.log("finally1")
          res.cookie("jwt", token, {
              domain: it,
            expires: new Date(Date.now() + (1000 * 60 * 60 * 24 * 30)),
            httpOnly: true
          })
          console.log("finally2")
          return res.redirect('/dashboard');
        } else {
          // return res.send('password mismatch')
          return res.status(422).render('auth', {
            errorMessage: "Incorrect Password",
            doctitle:"login"
          })
        }

      }
      if (!useremail) {
        // return res.send('email not found')
        return res.status(422).render('auth', {
          errorMessage: "User does not exist",
          doctitle:"login"
        })
      }






    }
    catch (err) {
      return res.send(err)
    }
  });
router.get("/logout", async (req, res) => {
  try {
    const user = await Userdb.findOne(req.user._id);
    user.tokens.pop();
    await user.save();
  } catch (error) {
    
  }
  res.clearCookie("jwt")
  return res.redirect('/auth')

});

router.get("/", (req, res) => {
  console.log('auth')
  res.render("auth.ejs", {
    errorMessage: "",
    doctitle:"login"
  })
})

module.exports = router;
