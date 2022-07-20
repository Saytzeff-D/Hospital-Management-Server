const mongoose=require('mongoose')
const deathSchema= mongoose.Schema({
    recordsId:String,
    healthId:String,
    deathDate:String,
    guardianName:String,
    patientName:String,
    gender: String,
    age: String,
    report:String
})
const DeathModel=mongoose.model('death_tb',deathSchema)
module.exports=DeathModel
