const mongoose=require('mongoose')
const birthSchema= mongoose.Schema({
    recordsId:String,
    childName:String,
    gender:String,
    weight:String,
    birthDate:String,
    address:String,
    motherHealthId:String,
    motherName:String,
    fatherName:String,
    report:String,
    exported:{default:false}
})
const NatalityModel = mongoose.model('natality_tb',birthSchema)
module.exports = NatalityModel
