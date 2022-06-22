const mongoose=require('mongoose')
// const bcrypt= require('bcryptjs')

let userSchema= mongoose.Schema({
   prototype:String
})
let userModel=mongoose.model('users', userSchema)
module.exports=userModel