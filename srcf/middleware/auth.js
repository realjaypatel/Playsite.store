const jwt = require('jsonwebtoken');
const Userdb = require("../../src/models/user.model");

const auth = async (req, res,next) => {
    try {
        const token = req.cookies.jwt;
        // console.log("token",token);
if(!token){
req.user = 0;
return next();
// return res.redirect('/auth')
}

        const verifyUser = await jwt.verify(token,'jwt')

         user = 0
        try {
             user = await Userdb.findOne({_id: verifyUser._id})
    //  console.log("tokennnnn",token, "user",user,verifyUser)
        } catch (error) {
            
        }
        if(user){      
            req.user = user 
        }else{
            req.user = 0
        }


        next();
    } catch (error) {
        return res.json({autherror:error})
    }
}
module.exports = auth;