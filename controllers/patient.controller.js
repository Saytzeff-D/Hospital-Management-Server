// const bcrypt= require('bcryptjs')
// const jwt=require('jsonwebtoken')

const patientModel = require("../model/patient.model")
const nodemailer=require('nodemailer')

const getLandingPage=(req,res)=>{
    res.send('Hello Patient')
}
const registerPatient=(req,res)=>{
    const patientDetails= req.body
    const generatePatientId = `HMS${Math.floor(Math.random()*10000)}`
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
    const userEmail = req.body.email
    console.log(req.body)
    patientModel.findOne(req.body, (err, result)=>{
        if(err){
            res.status(300).json({status: false, message: 'Server Error'})
        }else{
            console.log(result)
            if(result){
                let transporter = nodemailer.createTransport({
                    service: 'gmail',
                    port: 465,
                    secure: true,
                    auth: {
                      user:process.env.ADMIN_EMAIL,
                      pass:process.env.ADMIN_PASSWORD
                    }
                  });
                  
                  let mailOptions = {
                    from: process.env.ADMIN_EMAIL,
                    to: userEmail,
                    subject: 'Hospital Management Software: Patient Id Retrieval',
                    html: `Dear Patient, Welcome to the Hospital Management Software. We care about your wellbeing and health status. Below is your Patient Id. Do not disclose this to anyone.
                     <br>   
                     <b>
                     Patient ID: ${result.patientId}       
                     </b>
                    `
                  };
                  
                  transporter.sendMail(mailOptions, (error, info)=>{
                    if (error) {
                        console.log(error)
                        res.status(501).send({status:false, message:'Unable to Send Email. Mailer Error'})
                    } 
                    else {
                        console.log(info)   
                        res.status(200).json({message: 'A message has been sent to your E-Mail Account. Please Check.'})         
                    }
                  });
            }else{
                res.status(200).json({status: false, message: 'E-Mail does not exist'})
            }
        }
    })
    }

const login = (req, res) => {
    const details = req.body;
    patientModel.findOne({email: details.email}, (err, response) => {
        if(err) {
            res.status(501).send({status: false, message: "Internal Server Error"});
        } else {
            if (!response) {
                res.send({status: false, message: "Invalid email"});
            } else {
                if(response.healthId == details.healthId) {
                    res.send({status: true, message: "login Successful", response});
                } else {
                    res.send({status: false, message: "Incorrect Health ID"});
                }
            }
        }
    })
}


module.exports={getLandingPage,registerPatient, retrievePatientId, login}
