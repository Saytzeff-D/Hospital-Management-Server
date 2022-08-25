const mongoose=require('mongoose')
const cloudinary = require('cloudinary')


cloudinary.config({ 
    cloud_name: process.env.CLOUD_NAME, 
    api_key: process.env.API_KEY, 
    api_secret: process.env.API_SECRET
});



let patientSchema= mongoose.Schema({
   fullName:{type:String,require:true},
   guardianName:{type:String,require:false},
   bloodGroup:{type:String,require:false},
   email:{type:String,require:false},
   phone:{type:String,require:false},
   disability:{type:String,require:true},
   gender:{type:String,require:true},
   address:{type:String,require:false},
   dob:{type:String,require:true},
   maritalStatus:{type:String,require:false},
   created:String,
   photo:{type:String,require:false},
   healthId: String,
   weight:{type:String,default:'NA'},
   height:{type:String, default:'NA'},
   genotype:{type:String, default:'NA'},
   mortality:{type:Boolean,default:false}
})


patientSchema.pre('save', function(next){
   const file = this.photo
   if(!this.photo){
    console.log('no photo')
    next()
   }
   cloudinary.v2.uploader.upload(file, {public_id: this.fullName}, (err,result)=>{
    if(err){
    console.log('Failed to upload')
    }else{
    let publicName = this.fullName
    let imageUrl = result.secure_url
    let splitting = imageUrl.split('upload')        
    let path = splitting[0]+'upload'
    let newImagepath =`${path}/${'w_250,c_scale'}/${publicName}`
    this.photo = newImagepath
    next()
    }
}); 

  })




const PatientModel = mongoose.model('patient', patientSchema)

module.exports = PatientModel