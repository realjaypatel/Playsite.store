const express = require("express");
const router = express.Router();
const Userdb = require("../models/user.model");
const Postdb = require("../models/post.model");
var objectId = require('mongodb').ObjectID;
const jwt = require('jsonwebtoken')
const auth = require('../middleware/auth')
const path = require("path")
const fileUpload = require("express-fileupload");
const fs = require('fs');
const aws = require('aws-sdk');
const multerS3 = require('multer-s3');
const config = require('dotenv').config();


var AWS = require('aws-sdk');
var accessKeyId = process.env.ACCESS_LINODE_KEY
var secretAcessKey = process.env.ACCESS_LINODE_SECRET_KEY
AWS.config.update({
  "secretAccessKey": "gHBhvkda7Fnq5RzaBrEBuhnZB84lvUuWTgNFKuin",
  "accessKeyId": 'WUO7MAQ2CBSJTUVND9XD',
  region: 'us-southeast-1'
});
const spacesEndpoint = new AWS.Endpoint('us-southeast-1.linodeobjects.com');
let s3 = new AWS.S3({
  endpoint: spacesEndpoint
});






let fileuploader = (d)=>{
   file = d;
  // console.log(file);
  // 
  filename = `${Date.now()}-${Math.floor(10000000 + Math.random() * 90000000)}` +file.name
  //  p = __dirname + "\\..\\..\\uploads\\" +filename;
p = path.join(__dirname, '..','..', 'uploads', filename)

  file.mv(p, (err) => {
    if (err) {
     return 0
    }
    // console.log("==>filename",filename,"p",p);
 return filename
  });
  
  

  return filename
}

let filedelete = (d)=>{

  console.log(">>delete file function")
  p = path.join(__dirname, '..','..', 'uploads', d)
  console.log(p)
  fs.unlink(p,function(err){
    console.log('done deleting')
    if(err){
      console.log(err);
      return ;
    } 
    console.log('file deleted successfully'+d);
});  

}




let gfs3fileuploader = async (d) => {
  
  if(d == null){
    throw Error ('no file')
  }



  console.log('>>>>>>>>>>>>>>>>>>>>>>>running s3 file uploader',d)

  file = d;
  filename = `${Date.now()}-${Math.floor(10000000 + Math.random() * 90000000)}` +file.name
  filename = filename.replace(/[^a-zA-Z0-9.]/g, '')
  
  console.log("??????????????????????????????????>>>",filename);  

  // Binary data base64
  const fileContent  = Buffer.from(file.data, 'binary');

  // Setting up S3 upload parameters
  const params = {
     ACL: "private",
      Bucket: 'hero-game',
      Key: filename, // File name you want to save as in S3
      Body: fileContent 
  };

  // Uploading files to the bucket
  let k = await s3.upload(params, function(err, data) {
      if (err) {
       
           throw err;
      }
      console.log("?????????????????????????????????? success",data)


  });
  return filename;

}
let gfs3filedelete = async (d)=>{

try {
  const filename = d;
  await s3.deleteObject({ Bucket: "hero-game", Key: filename }).promise();
  console.log("??????????????????????????????????","file deleted successfully");
return "file deleted successfully"
} catch (error) {
  console.log(">>>>>>>>>>>>>>>>>.",error)
}




}



let s3fileuploader = async (d) => {
  
  if(d == null){
    throw Error ('no file')
  }



  console.log('>>>>>>>>>>>>>>>>>>>>>>>running s3 file uploader',d == null,"/d")

  file = d;
  filename = `${Date.now()}-${Math.floor(10000000 + Math.random() * 90000000)}` +file.name
  filename = filename.replace(/[^a-zA-Z0-9.]/g, '')
  console.log("??????????????????????????????????",file);

  // Binary data base64
  const fileContent  = Buffer.from(file.data, 'binary');

  // Setting up S3 upload parameters
  const params = {
    ACL: "public-read",
      Bucket: 'hero',
      Key: filename, // File name you want to save as in S3
      Body: fileContent 
  };

  // Uploading files to the bucket
  let k = await s3.upload(params, function(err, data) {
      if (err) {
       
           throw err;
      }
      console.log("??????????????????????????????????",data)


  });
  return filename;

}
let s3filedelete = async (d)=>{

try {
  const filename = d;
  await s3.deleteObject({ Bucket: "hero", Key: filename }).promise();
  console.log("??????????????????????????????????","file deleted successfully");
return "file deleted successfully"
} catch (error) {
  console.log(">>>>>>>>>>>>>>>>>.",error)
}




}











router.post("/addpost",auth,async (req, res) => {




//   if(req.files){
//      gameFile = await fileuploader(req.files.gameFile)
//  logo = await fileuploader(req.files.logo)
//  thumbnail = await fileuploader(req.files.thumbnail)
// images = []

// for(let x = 0; x < req.files.images.length;x++){
//   console.log('===>',x)
//   data = await fileuploader(req.files.images[x]);
//   images[x] = data
// }




//   }else{
//    //yaha sab handle karna hai ki file nahi aayi to kya karna hai
//   }
gameFile = '';
logo = ''
thumbnail = '';
images = []
  if(req.files){


    try {
      console.log("gamefile1")
      gameFile = await gfs3fileuploader(req.files.gameFile)
      console.log("gamefile2")
    } catch (error) {
      
    }
    
    try {
      
    
    logo = await s3fileuploader(req.files.logo)
    } catch (error) {
      
    }
    
    try {
      
    thumbnail = await s3fileuploader(req.files.thumbnail)
    } catch (error) {
      
    }
    
    try {
      images = []
    
    for(let x = 0; x < req.files.images.length;x++){

    data = await s3fileuploader(req.files.images[x]);
    images[x] = data
    }
    } catch (error) {
      
    }
    
    
    
     }else{
     
     }


if(!req.user){
  return res.json({msg:'no user found'})
}




  const newpost = new Postdb({
user:req.user._id,
logo:logo,
thumbnail:thumbnail,
title:req.body.title,
about:req.body.about,
images:images,
platform:req.body.platform,
gameFile:gameFile,
ytLink:req.body.ytLink
  })

  await new Promise(resolve => setTimeout(resolve, 1000));

  newpost.save().then((post) => {
  




  return res.redirect('/dashboard')
}
  )
.catch(err =>res.json(err))
});


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
  







  
// router.get("/", async (req, res) => {

//   Postdb.find()
//   .sort({date: -1})
//   .then(j => res.json(j))
//   });


router.delete("/:id",auth, async (req, res) => {
    console.log('delete id',req.params.id)
      if(!req.user){
        return res.json({msg:req.user,msg2:'not allowed'})
      }
      try {
        Postdb.findById(req.params.id)
        .then(post =>{
    //check for post owner;
  
  if(post.user.toString() !== req.user._id.toString()){
      return res.json({ notauthorised:'access denied'})
    }
    //delete post

    try {
console.log('logo')
      s3filedelete(post.logo);
      console.log('t')
      s3filedelete(post.thumbnail);
      console.log('gf')
      gfs3filedelete(post.gameFile);
      
  for(x = 0; x < post.images.length; x++){
    s3filedelete(post.images[x]);

  }

  
    } catch (error) {
      
    }

    post.remove().then(()=>{

    return res.json({success:'true'})
    })
        }).catch((e)=>{
          return res.json({postnotfound:"post not found"})
        })
    
    
      } catch (error) {
        return res.json({error})
      }
    
    
    
    
    
    
    
    
    
    
    
    
    
    
        });

















router.post("/update/:id",auth, async (req, res) => {
  console.log('../',req.files)

console.log('====>',req.body.title,req.body.txt,req.params.id)

  if(!req.user){
    return res.json({msg:req.user,msg2:'not allowed'})
  }
  if(!req.body){
    return res.send({ message : "Data to update can not be empty"})
}

 try {
  const post = await Postdb.findById(req.params.id)


  if(!post){
    return res.json({postnotfound:"post not found"})
  }
  let updated_data = post
  updated_data.title = req.body.title
  updated_data.about = req.body.about
  updated_data.platform = req.body.platform
updated_data.ytLink = req.body.ytLink

  if(req.files){


try {
  console.log('gamefile1')
  gameFile = await gfs3fileuploader(req.files.gameFile)
  console.log('gamefile2')
  updated_data.gameFile = gameFile
  gfs3filedelete(post.gameFile)
  console.log('gamefile3')
} catch (error) {
  console.log('gamefileerr')
}

try {
  

logo = await s3fileuploader(req.files.logo)
console.log('deleting update logo')
s3filedelete(post.logo)
updated_data.logo = logo
console.log('logo', logo)
} catch (error) {
  console.log('logo error', error)
}

try {
  
thumbnail = await s3fileuploader(req.files.thumbnail)
s3filedelete(post.thumbnail)
console.log('++++++++++++>',thumbnail)
updated_data.thumbnail = thumbnail
} catch (error) {
  
}

try {
  images = []

for(let x = 0; x < req.files.images.length;x++){

data = await s3fileuploader(req.files.images[x]);

images[x] = data
}

for(x = 0; x < post.images.length; x++){
  s3filedelete(post.images[x]);

}

updated_data.images = images
} catch (error) {
  
}



 }else{
 
 }












  if(post.user.toString() == req.user._id.toString()){
  await post.updateOne({$set:updated_data})

  await new Promise(resolve => setTimeout(resolve, 1000));

  return res.redirect('/dashboard/update-post?id='+req.params.id)
  }else{
    return res.json({ notauthorised:'access denied :- not by owner'})
  }


    



























    
  } catch (error) {
return res.json({err:error})
}
    
    
    
    
    
    
    
    
    
    
    
    
    
    
        });


    
module.exports = router;
