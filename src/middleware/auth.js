const jwt = require('jsonwebtoken');
const Userdb = require("../models/user.model");

const auth = async (req, res,next) => {
    try {
        const token = req.cookies.jwt
if(!token){
req.user = "";
return res.redirect('/auth')
}

        const verifyUser = await jwt.verify(token,'jwt')

         user = 0
        try {
             user = await Userdb.findOne({_id: verifyUser._id})
 
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