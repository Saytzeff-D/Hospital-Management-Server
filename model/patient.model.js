const mongoose=require('mongoose')
const cloudinary = require('cloudinary')
// const bcrypt= require('bcryptjs')

let patientSchema= mongoose.Schema({
   fullName:{type:String,require:true},
   guardianName:{type:String,require:false},
   bloodGroup:{type:String,require:false},
   email:{type:String,require:true},
   phone:{type:String,require:true},
   disability:{type:String,require:true},
   gender:{type:String,require:true},
   address:{type:String,require:true},
   dob:{type:String,require:true},
   maritalStatus:{type:String,require:true},
   photo:{type:String,require:true},
   patientId: String
})


patientSchema.pre('save', function(next){

   const file =this.photo
   cloudinary.v2.uploader.upload(file,{public_id:this.fullName},(err,result)=>{
       if(err){
           console.log(err)
       }else{

        let publicName=this.fullName
        let imageUrl=result.secure_url
        let splitting=imageUrl.split('upload')
        console.log(splitting)
        
        let path=splitting[0]+'upload'
        let newImagepath=`${path}/${'w_400,h_280,c_scale'}/${publicName}`
        console.log(newImagepath)

           this.photo=newImagepath
           next()
       }
   }); 

  })




let patientModel=mongoose.model('patient', patientSchema)
    module.exports=  patientModel