const mongoose = require("mongoose");
const cloudinary = require('cloudinary')
const bcrypt=require('bcryptjs')
const saltRound = 10


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
  bcrypt.hash(this.password, saltRound, (err, hashedPassword)=>{
    if(err){
      console.log(err)
      console.log('Unable to hash Password')
        }else{
          this.password = hashedPassword
          }
      })
  const fullName = `${this.fname}_${this.lname}`
  cloudinary.v2.uploader.upload(this.photo, {public_id: fullName}, (err,result)=>{

  if(err){
    console.log('Failed to upload')
    console.log(err)
    }else{
      let publicName = fullName
      let imageUrl = result.secure_url
      let splitting = imageUrl.split('upload')
      let path=splitting[0]+'upload'
      let newImagepath = `${path}/${'w_250,c_scale'}/${publicName}`
      this.photo = newImagepath
     next()
      }
  })

})


let StaffModel = mongoose.model("staff", staffSchema);

module.exports = StaffModel;