const express = require("express");
const router = express.Router();
const { check, body, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const Userdb = require("../models/user.model");
// let sitedomain = ".example.com:300"


router.post("/register",
  check('name' ,"name is required ")
    .isLength({ min: 1 })
    .custom((value) => {
      if (value.indexOf(' ') >= 0) {
        throw new Error('username must not contain spaces') 
      }
      return true;
    }),
  check('email', 'Email is required')
    .isEmail(),
  check('password', 'Password is required')
    .isLength({ min: 1 })
  , async (req, res) => {
    // console.log(req.body);
    let errors = validationResult(req);
    console.log(errors);
    if (!errors.isEmpty()) {
      return res.status(422).render('auth', {
        errorMessage: errors.array()[0].msg,
        doctitle:"signup"
      })
    }
    const name = req.body.name.toLowerCase();
    const email = req.body.email.toLowerCase();
    const password = req.body.password;

    try {
      username = await Userdb.findOne({name:name});
      useremail = await Userdb.findOne({ email: email });
      /**
     * @description check if the username is already exists and if it exists return 
     */
    if (username) {
      return res.render('auth',
        { errorMessage: 'username already in use choose different username' ,
        doctitle:"signup"})
    }

    } catch (error) {

    }
    

    if (useremail) {
      return res.render('auth',
        { errorMessage: 'email already in use' ,
        doctitle:"signup"})
    }

    try {
      const hashedPassword = await bcrypt.hash(password, 12);
      // console.log(hashedPassword);
      const user = new Userdb(
        {
          name:name,
          email: email,
          password: hashedPassword
        }
      )
      const registered = await user.save();


      // console.log('a')
      const token = await registered.generateAuthToken();
      var fullUrl =   req.get('host') ;
      let it =  fullUrl.charAt(fullUrl.length-1)
      if(it == '0'){
       it = ".example.com"
      }else{
       it = ".playsite.store"
      }

      console.log("finally")
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
      const email = req.body.email.toLowerCase();
      const password = req.body.password;

      const useremail = await Userdb.findOne({ email: email });
      if (useremail) {
        // console.log(useremail)
        console.log(useremail.password)
        const result = await bcrypt.compare(password, useremail.password);
        // console.log(result);
        // console.log( "this is result ", result);
        if (result) {
          console.log('a102')
          const token = await useremail.generateAuthToken();
          let newtokens = [];
          console.log(useremail.tokens);
          while(useremail.tokens.length>0 && newtokens.length <= 3){
            newtokens.push(useremail.tokens.pop());
          }
          useremail.tokens = newtokens;
          await useremail.save();
          var fullUrl =   req.get('host') ;
          let it =  fullUrl.charAt(fullUrl.length-1)
          if(it == '0'){
           it = ".example.com"
          }else{
           it = ".playsite.store"
          }
          res.cookie("jwt", token, {
               domain: it,
            expires: new Date(Date.now() + (1000 * 60 * 60 * 24 * 30)),
            httpOnly: true
          })
          
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
