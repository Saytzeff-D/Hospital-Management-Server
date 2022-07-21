const mongoose=require('mongoose')
const mortalitySchema= mongoose.Schema({
    recordsId:String,
    healthId:String,
    deathDate:String,
    guardianName:String,
    patientName:String,
    gender: String,
    age: String,
    report:String
})
const MortalityModel = mongoose.model('mortality_tb', mortalitySchema)
module.exports = MortalityModel
