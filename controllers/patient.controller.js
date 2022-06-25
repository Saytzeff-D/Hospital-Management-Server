// const bcrypt= require('bcryptjs')
// const jwt=require('jsonwebtoken')

const patientModel = require("../model/patient.model")
const nodemailer=require('nodemailer')

const getLandingPage=(req,res)=>{
    res.send('Hello Patient')
}
const registerPatient=(req,res)=>{
    const patientDetails= req.body
    const generatePatientId = `PAT${Math.floor(Math.random()*1000)}`
    patientDetails.patientId = generatePatientId
    patientModel.findOne({email: req.body.email}, (err, result)=>{
        if (err) {
            res.status(300).json({message: 'Server Error'})
        } else {
            if (result) {
                res.status(200).json({message: 'E-mail Already exist'})
            } else {
                let form = new patientModel(patientDetails)
                form.save( (err)=>{
                if(err){
                    console.log(err)
                    res.status(301).send({status:false, message:'Internal server error'})
                }else{
                    res.status(200).json({message: 'Success', patientId: generatePatientId})
                }
                })
            }
        }
    })
}
const retrievePatientId = (req, res)=>{  
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user:process.env.ADMIN_EMAIL,
          pass:process.env.ADMIN_PASSWORD
        },tls: {
            rejectUnauthorized: false
        }
      });
      
      let mailOptions = {
        from:process.env.USER,
        to: req.body.email,
        subject: 'Hospital Management Software: Patient Id Retrieval',
        html: `Dear Patient, Welcome to the Hospital Management Software. We care about your wellbeing and health status. Below is your Patient Id. Do not disclose this to anyone.
         <br>   
         <b>
         Patient ID: ${generateHealthID}       
         </b>
        `
      };
      
      transporter.sendMail(mailOptions, (error, info)=>{
        if (error) {
            console.log(error)
            res.status(501).send({status:false, message:'internal server errorsss'})
        } 
        else {
            console.log(info)            
        }
      });
    }


module.exports={getLandingPage,registerPatient, retrievePatientId}
