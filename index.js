require("dotenv").config()
const express = require("express");
const app = express();
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser');
const auth = require('./src/middleware/auth')
const fileUpload = require("express-fileupload");
var subdomain = require('express-subdomain');
const vhost = require('vhost')
const serveIndex = require('serve-index');
// const limiter = require("express-rate-limit")

// const helmet =  require("helmet");
// const compression = require('compression');


app.use(express.json())
app.use(express.static('public'))
app.use(express.static('uploads'))
app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cookieParser())
app.use(fileUpload({ createParentPath: true }));

// app.use(compression());

// app.disable('x-powered-by')
// app.disable('x-powered-by')

// app.use(helmet.contentSecurityPolicy());
// app.use(helmet.frameguard());
// app.use(helmet.hidePoweredBy());
// app.use(helmet.xssFilter());
// app.use(helmet.noSniff());


const cors = require("cors");
const corsOptions = {
  origin: '*',
  credentials: true,            //access-control-allow-credentials:true
  optionSuccessStatus: 200
}
app.use(cors(corsOptions));

// const limit = limiter({
//   max: 5,
//   windowMs:10000
// })

// app.use(limit);


// app.get('/test', (req, res, next) => {
//   res.send("This  test");
// })



















//controllers

const backController = require("./src/controllers/all.controller.js");
const frontController = require("./srcf/controllers/all.controller.js");
// app.use("/", allController);


// app.get('*', function(req, res, next){ 
//   console.log("====>"+req.headers.host);
//   if(req.headers.host == 'dev.example.com:300'){  //if it's a sub-domain
//   console.log(req.headers.host);
//     req.url = '/dev' + req.url;
//     }  //append some text yourself
//   next(); 
// });




// app.use(subdomain('dev', backController));
// app
app.use(vhost('dev.example.com', backController))
app.use(vhost('example.com', frontController))
app.use(vhost('dev.playsite.store', backController))
app.use(vhost('playsite.store', frontController))
app.use('/', frontController)
// 	.use(vhost("portfolio.localhost", portfolio))
// app.use(subdomain('*', frontController));
// app.use('/dev', backController);
// app.use('*', frontController);























app.get("/test",(req, res) => {
  // let myStr = req.user;
  var fullUrl =   req.get('host') ;
 let it =  fullUrl.charAt(fullUrl.length-1)
 if(it == '0'){
  it = ".example.com:300"
 }else{
  it = ".playsite.store"
 }
  // res.json({ a: req.user,platform:fullUrl })
  res.json({ platform:it })
})










app.get("/auth", (req, res) => {

  res.render("auth.ejs")
})
app.get("/tandc", (req, res) => {

  res.render("tandc.ejs")
})
app.get("/privacy", (req, res) => {
  res.render("privacy.ejs")
})
app.get("/faq", (req, res) => {
res.render("faq.ejs")
})
app.get("/docs", (req, res) => {
  res.render("docs.ejs")
  })
app.get("/support", (req, res) => {
  res.render("support.ejs")
  })























try {
  if(true){

  app.get(
    '/*',
    express.static('uploads'),
    serveIndex('uploads', { icons: true })
  )
}
} catch (error) {
}


const hostroute = require('./src/host/host')
app.use('/*',hostroute)



// app.use((error, req, res, next) => {
//   // const status = error.status || 500;
//   // const message = error.message || "some error"
//   res.status(404).render('error', { message: "Something Wrong" });
// });
// app.use((req, res, next) => {
//   res.status(404).render('error', { docTitle: 'Page Not Found' });
// });
module.exports = app