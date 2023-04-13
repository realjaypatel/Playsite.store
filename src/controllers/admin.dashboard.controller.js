const express = require("express");
const Userdb = require("../models/user.model");
const Postdb = require("../models/post.model");
var objectId = require('mongodb').ObjectID;
const jwt = require('jsonwebtoken')
const auth = require('../middleware/auth');
const connect = require("../configs/db");
const path = require("path")
let url = "https://hero.us-southeast-1.linodeobjects.com/"
const app = express();
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, '..\\..\\','views'));
app.use(express.static(path.join(__dirname, '..\\..\\','public')))
const aws = require('aws-sdk');
const multerS3 = require('multer-s3');
const config = require('dotenv').config();
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(express.json())
const cookieParser = require('cookie-parser');
app.use(cookieParser())
const fileUpload = require("express-fileupload");
app.use(fileUpload({ createParentPath: true }));

















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













let gfs3fileuploader = async (d) => {
  
    if(d == null){
      throw Error ('no file')
    }
  
  
    file = d;
    filename = `${Date.now()}-${Math.floor(10000000 + Math.random() * 90000000)}` +file.name
    filename = filename.replace(/[^a-zA-Z0-9.]/g, '')
  
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
  
  
    });
    return filename;
  
  }
  let gfs3filedelete = async (d)=>{
  
  try {
    const filename = d;
    await s3.deleteObject({ Bucket: "hero-game", Key: filename }).promise();
  return "file deleted successfully"
  } catch (error) {
  }
  
  
  
  
  }
  
  
  
  let s3fileuploader = async (d) => {
    
    if(d == null){
      throw Error ('no file')
    }
  
  
  
  
    file = d;
    filename = `${Date.now()}-${Math.floor(10000000 + Math.random() * 90000000)}` +file.name
    filename = filename.replace(/[^a-zA-Z0-9.]/g, '')
  
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
  

















app.get("/dashboard/update-post", async (req, res) => {
    if(!req.query.id){
        res.send('invalid id')
        return;
      }

    let post = 0
    try {
        post = await Postdb.findById( req.query.id)

    } catch (error) {
res.json({msg:error})
    }
    if(!post){
        return res.json({ postnotfound: 'nopost found with this id' })
    }
console.log('===>',post)
    return res.render('viewsb/update_post.ejs',{post:post,url:url,user:'admin',userdetails:req.user})



});






app.post("/post/update/:id", async (req, res) => {

  console.log('../',req.files)

console.log('====>',req.body.title,req.body.txt,req.params.id)


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












  if(true){
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
      


    

app.delete("/post/:id", async (req, res) => {
    console.log('delete id',req.params.id)
   
      try {
        Postdb.findById(req.params.id)
        .then(post =>{
    //check for post owner;

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



app.get("/", async (req, res) => {
    console.log('dash req')

        let post = 0
        try {
            post = await Postdb.find()
    
        } catch (error) {
    
        }
    
    
         return res.render('viewsb/index.ejs', { posts: post ,url:url,user:'admin',userdetails:req.user})
    
    console.log('dash req end')
    
    });





































    
    const mongoose = require("mongoose");























let mongo = () => {
 mongoose.connect('mongodb+srv://user:user@cluster0.brnrumt.mongodb.net/?retryWrites=true&w=majority');
console.log('mongo connecting')
};

mongo();



    const PORT = process.env.PORT || 400;
    app.listen(PORT, async () => {
      
        console.log("listening to port", PORT);
      });