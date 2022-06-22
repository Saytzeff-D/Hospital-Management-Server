// const userModel = require("../model/user.model")
// const bcrypt= require('bcryptjs')
// const res = require("express/lib/response")
// const jwt=require('jsonwebtoken')
// const secret=process.env.JWT_SECRET

const patientModel = require("../model/patient.model")



const getLandingPage=(req,res)=>{
res.send('hello world home page')
}


const postSignUp=(request,response)=>{
let patientDetails= request.body

let form=new patientModel(patientDetails)

form.save(  (err)=>{

    if(err){
        response.status(501).send({status:false, message:'internal server error'})
    }
    else{
        response.send({status:true, message:'operation succesful'})

    }
})


}

module.exports={getLandingPage,postSignUp}