const mongoose=require('mongoose')
// const bcrypt= require('bcryptjs')

let patientSchema= mongoose.Schema({
   fullName:{type:String,require:true},
   guardian:{type:String,require:true},
   bloodGroup:{type:String,require:true},
   email:{type:String,require:true},
   phone:{type:String,require:true},
   disability:{type:String,require:true},
   sex:{type:String,require:true},
   address:{type:String,require:true},
   dob:{type:String,require:true},
   name:{type:String,require:true},
   maritalStatus:{type:String,require:true},
   photo:{type:String,require:true}
})


patientSchema.pre('save', function(next){

   const file =this.filename
   cloudinary.v2.uploader.upload(file,{public_id:this.foodName},(err,result)=>{
       if(err){
           console.log(err)
           // result.send({message:'upload failed', status:false}
       }else{

        let publicName=this.foodName
        let imageUrl=result.secure_url
        let splitting=imageUrl.split('upload')
        console.log(splitting)
        
        let path=splitting[0]+'upload'
        let newImagepath=`${path}/${'w_400,h_280,c_scale'}/${publicName}`
        console.log(newImagepath)

           this.filename=newImagepath
           next()
       }
   }); 

  })


let patientModel=mongoose.model('patients', patientSchema)
module.exports=patientModel