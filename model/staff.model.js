const mongoose = require("mongoose");
const cloudinary=require('cloudinary')
const bcrypt=require('bcryptjs')
const saltround=10


cloudinary.config({ 
  cloud_name: process.env.CLOUD_NAME, 
  api_key: process.env.API_KEY, 
  api_secret: process.env.API_SECRET
});



const staffSchema = mongoose.Schema({
  fname: String,
  lname: String,
  email: String,
  password: String,
  phone: String,
  gender:String,
  maritalStatus:String,
  bloodGroup:String,
  address:String,
  dob:String,
  created:String,
  role:String,
  photo:String,
  specialty:String,
  created:String

})

staffSchema.pre('save',  function(next){


  bcrypt.hash(this.password,saltround, (err,hashedPassword)=>{
    if(err){
      console.log(err)
      console.log('cant hash password')
        }else{
          this.password=hashedPassword
// next()
          }
      })

let fullName=`${this.fname}_${this.lname}`
let file=this.photo

cloudinary.v2.uploader.upload(file, {public_id:fullName}, (err,result)=>{

  if(err){
    console.log('failed to upload')
    console.log(err)
    }else{
      let publicName=fullName
      let imageUrl=result.secure_url
      let splitting=imageUrl.split('upload')
      let path=splitting[0]+'upload'
      let newImagepath=`${path}/${'w_250,c_scale'}/${publicName}`
      // console.log(newImagepath)
      this.photo=newImagepath
     next()
      }
  })

})


let StaffModel = mongoose.model("staff", staffSchema);
// console.log('database stored')

module.exports = StaffModel;