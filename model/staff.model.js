const mongoose = require("mongoose");
const cloudinary=require('cloudinary')
const bcrypt=require('bcryptjs')
const saltround=10

const staffSchema = mongoose.Schema({
  fullName: String,
  email: String,
  password: String,
  phone: String,
  gender:String,
  maritalStatus:String,
  bloodGroup:String,
  address:String,
  created:String,
  role:String,
  photo:String

})

// staffSchema.pre('save', (next)=>{
//   bcrypt.hash(this.password,saltround, (err,hashedPassword)=>{
//     if(err){
//         console.log(err)
//         console.log('cant hash password')
//     }else{
//         this.password=hashedPassword
//     }    
//     })
// let file=this.photo
// cloudinary.v2.upload(file, {public_id:this.fullName}, (err,result)=>{
//   if(err){
// console.log('failed to upload')
// console.log(err)
//   }
//   else{
//     let publicName=this.fullName
//     let imageUrl=result.secure_url
//     let splitting=imageUrl.split('upload')
//     let path=splitting[0]+'upload'
//     let newImagepath=`${path}/${'w_250,c_scale'}/${publicName}`
//     console.log(newImagepath)
//     this.photo=newImagepath
//     next()
//   }
// })
// })

let StaffModel = mongoose.model("staff", staffSchema);
module.exports = StaffModel;
