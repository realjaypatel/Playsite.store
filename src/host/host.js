const express = require('express')
const router = express.Router();
const download = require('download-git-repo')
const serveIndex = require('serve-index')
router.get('/',express.static('uploads'), (req, res) => {
console.log('running the create')

console.log(req.baseUrl)

var result = req.baseUrl.substring(1)

try {
  console.log('running the create')
    download(result, 'uploads/'+result, function (err) {
        // console.log(err ? 'Error' : 'Succesis')
    if(err){
      res.render('error',{error:'error with the link 😔'})
    
    }
    else{
    res.redirect('/'+result)
    }
      })
    
} catch (error) {



  // let dir = 'C:\\Users\\jay\\Desktop\\netlify\\netlify\\uploads'
  // // app.use('/',serveIndex(dir+'/'));
  

console.log('😔...')
   res.render('error',{error:'not valid link 😔...'})


}










 });
 
 
 module.exports = router;