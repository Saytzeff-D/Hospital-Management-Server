// const userModel = require("../model/user.model")
// const bcrypt= require('bcryptjs')
// const res = require("express/lib/response")
// const jwt=require('jsonwebtoken')
// const secret=process.env.JWT_SECRET

const patientModel = require("../model/patient.model")
const nodemailer=require('nodemailer')
let patientFormBody={}
const getLandingPage=(req,res)=>{
res.send('hello patient')
}


const postSignUp=(request,response)=>{

let patientDetails= request.body
// response.send(patientDetails)
patientFormBody=patientDetails
let form=new patientModel(patientDetails)

form.save( (err)=>{

    if(err){
        response.status(501).send({status:false, message:'internal server errorss'})
    }
    else{

        sendEmail({recipientMail:patientDetails.email, recipientName:patientDetails.fullName, responseKey:response})
        // response.send({status:true, message:'operation succesful'})

    }
})


}





function sendEmail(recepientDetails){
let generateHealthID=`PAT${Math.floor(Math.random()*10000)}`
  
let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user:process.env.USER,
          pass:process.env.PASS
        },tls: {
            rejectUnauthorized: false
        }
      });
      
      let mailOptions = {
        from:process.env.USER,
        to: recepientDetails.recipientMail,
        subject: 'Hospital Management Software',
        html: `Dear ${recepientDetails.recipientName}, Welcome to the Hospital Management Software. The following are your credentials to login to your successfully registered account.
         <br>   
         <b>
         Email: ${recepientDetails.recipientMail}
         <br>
         HealthID: ${generateHealthID}       
         </b>
        `
      };
      
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            console.log(error)
            recepientDetails.responseKey.status(501).send({status:false, message:'internal server errorsss'})
        } 
        else {
updatePatientData({responseKey:recepientDetails.responseKey, email:recepientDetails.recipientMail, healthNumber:generateHealthID})
console.log(info.response)            
        }
      });
    }


function updatePatientData(updateDetails){
patientFormBody.patientID=updateDetails.healthNumber

    patientModel.findOneAndUpdate({email:updateDetails.email}, patientFormBody ,(err)=>{
if(err){
    updateDetails.responseKey.send({status:false, message:'internal server errorssssss'})
}
else{
    updateDetails.responseKey.send({status:true, message:'operation succesful',patientID:updateDetails.healthNumber})

}
 })

}

module.exports={getLandingPage,postSignUp}
