const express = require("express");
const router = express.Router();
 const Userdb = require("../../../../src/models/user.model");
const Postdb = require("../../../../src/models/post.model");
var objectId = require('mongodb').ObjectID;
const jwt = require('jsonwebtoken')
const auth = require('../../../middleware/auth')
// const url = "https://hero.us-southeast-1.linodeobjects.com/"
const serveIndex = require('serve-index');
var url = require('url');
const download = require('download-git-repo')



router.get("/",auth, async (req, res) => {
  return res.render('viewsf/host/index.ejs');
});

router.post('/link', (req, res) => {
  console.log(req.body.id)
  const url2 =  req.body.id 
  try{
  var result = url.parse(url2).pathname.substring(1)
  }catch(err){

  }


try{

  download(result, 'uploads/'+result, function (err) {

    if(err){
         res.render('viewsf/host/error.ejs', {error:"Link is not valid"})
    // res.json({a:'err'})
    }
    else{
        let link = 'your link is '+"https://playsite.store/"+result || 'error'
         res.render('viewsf/host/success.ejs',{link:link})
        // res.json({a:link})
    }
        })
    
    

}catch(err){    res.render('viewsf/host/error.ejs', {error:"Link is not valid"})}




try {
    
} catch (error) {
    
}





 });





module.exports = router;
