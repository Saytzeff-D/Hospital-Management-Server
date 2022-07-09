const mongoose=require('mongoose')
const cloudinary = require('cloudinary')
// const bcrypt= require('bcryptjs')


cloudinary.config({ 
    cloud_name: process.env.CLOUD_NAME, 
    api_key: process.env.API_KEY, 
    api_secret: process.env.API_SECRET
});



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
   created:String,
   photo:{type:String,require:true},
   healthId: String,
   weight:{type:String,default:'NA'},
   height:{type:String, default:'NA'}
})


patientSchema.pre('save', function(next){
console.log(9999)
   const file =this.photo
   cloudinary.v2.uploader.upload(file,{public_id:this.fullName},(err,result)=>{
    if(err){
 console.log('failed to upload')
}
else{
        let publicName=this.fullName
        let imageUrl=result.secure_url
        let splitting=imageUrl.split('upload')        
        let path=splitting[0]+'upload'
        let newImagepath=`${path}/${'w_250,c_scale'}/${publicName}`
        this.photo=newImagepath
           next()
       }
   }); 

  })




let patientModel=mongoose.model('patient', patientSchema)
    module.exports=  patientModel