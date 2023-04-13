const express = require("express");
const router = express.Router();
 const Userdb = require("../../src/models/user.model");
const Postdb = require("../../src/models/post.model");
var objectId = require('mongodb').ObjectID;
const jwt = require('jsonwebtoken')
const auth = require('../middleware/auth')
var AWS = require('aws-sdk');
var accessKeyId = "WUO7MAQ2CBSJTUVND9XD"
var secretAccessKey = "gHBhvkda7Fnq5RzaBrEBuhnZB84lvUuWTgNFKuin"
AWS.config.update({
    "secretAccessKey": "gHBhvkda7Fnq5RzaBrEBuhnZB84lvUuWTgNFKuin",
    "accessKeyId": 'WUO7MAQ2CBSJTUVND9XD',
    region: 'us-southeast-1'
});
const spacesEndpoint = new AWS.Endpoint('us-southeast-1.linodeobjects.com');
const s3 = new AWS.S3({
  signatureVersion: 'v4',
  endpoint: spacesEndpoint
});








const getSingedUrl = async (d) => {
    const params = {
        Bucket: 'hero-game',
        Key: d,
        Expires: 3  ,
        ResponseContentDisposition: 'attachment; filename ="' + d.substring(22) + '"',
        
      };
    try {
        const url = await new Promise((resolve, reject) => {
          s3.getSignedUrl('getObject', params, (err, url) => {
            err ? reject(err) : resolve(url);
          });
        });
        return(url)
      } catch (err) {
        if (err) {
          console.log(err)
        }
      }
    }
    


router.get("/:id", async (req, res) => {






  if(!req.params.id){
    res.send('invalid id')
    return;
  }
  let post = 0
  let username = {name:""};






try {
  post = await Postdb.findById(req.params.id)
}
catch(e){
  return res.json( { invalid_id: 'invalid id : '+req.params.id+e  })
}


  
try { 
  /**
   * @description it stores the number of visits for a post 
   */
    post.downloadNumber = post.downloadNumber + 1;
     await post.save();
  } catch (error) {
    console.log("error",error)
  }






let url = await getSingedUrl(post._doc.gameFile);

console.log(url)
  return res.redirect(url)

});










module.exports = router;
