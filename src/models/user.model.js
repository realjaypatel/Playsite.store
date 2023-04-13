const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

/**
 * @description recentVisits contains latest 20 visited id of games apps visited by user if logged in from example.com
 * @description visits contain total times of user account visited
 */
const userSchema = new mongoose.Schema({
  name: { type: String, unique:true },
  email: { type: String },
  password: { type: String },
  userimg: { type: String},
  userbg: { type: String},
  about: { type: String},
  verified: { type: Boolean },
  tokens: [{
    token: { type: String}
  }
  ],
  cart: [
    { type: mongoose.Schema.Types.ObjectId, ref: "post", required: false },
  ],
  wishlist: [
    { type: mongoose.Schema.Types.ObjectId, ref: "post", required: false },
  ],
  library: [
    { type: mongoose.Schema.Types.ObjectId, ref: "post", required: false },
  ],
  visits: {
    type: Number,
    default: 0
  },
  recentVisits:[{type: mongoose.Schema.Types.ObjectId, required: false}]
});

userSchema.methods.generateAuthToken =async function(){
  try{
    console.log('asdf')
    const token = jwt.sign({_id:this._id.toString()},'jwt')
    console.log('db',token)
    this.tokens = this.tokens.concat({token:token})
  
    await this.save();
    return token;
  }
  catch(e){
    return res.send('err'+e)
  }
}
module.exports = mongoose.model("user", userSchema);
