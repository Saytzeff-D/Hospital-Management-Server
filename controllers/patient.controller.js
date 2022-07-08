const PatientModel = require("../model/patient.model")
const nodemailer=require('nodemailer')
const jwt = require('jsonwebtoken')
const patientModel = require("../model/patient.model")

const getLandingPage=(req,res)=>{
    res.send('Hello Patient')
}
const registerPatient=(req,res)=>{
    const patientDetails= req.body
    const generateHealthId = `PAT${Math.floor(Math.random()*10000)}`
    patientDetails.healthId = generateHealthId
    PatientModel.findOne({email: req.body.email}, (err, result)=>{
        if (err) {
            res.status(300).json({message: 'Server Error'})
        } else {
            if (result) {
                res.status(200).json({message: 'E-mail Already exist'})
            } else {
                let form = new PatientModel(patientDetails)
                form.save( (err)=>{
                if(err){
                    console.log(err)
                    res.status(501).send({status:false, message:'Internal server error'})
                }else{
                    res.status(200).json({message: 'Success', healthId: generateHealthId})
                }
                })
            }
        }
    })
}
const retrievePatientId = (req, res)=>{
    const userEmail = req.body.email
    console.log(req.body)
    PatientModel.findOne(req.body, (err, result)=>{
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
                     Health ID: ${result.healthId}       
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
    console.log(details)
    PatientModel.findOne({email: details.email}, (err, response) => {
        if(err) {
            res.status(501).send({status: false, message: "Internal Server Error"});
        } else {
            if (!response) {
                res.send({status: false, message: "Invalid Email"});
            } else {
                if(response.healthId == details.healthId) {
                    const token = jwt.sign({email: details.email}, process.env.JWT_SECRET, {expiresIn: '60m'})
                    res.send({status: true, message: "login Successful", response, token});
                } else {
                    res.send({status: false, message: "Incorrect Health ID"});
                }
            }
        }
    })
}
const authenticatePatient = (req, res)=>{
    const splitJWT = req.headers.authorization.split(' ')
    jwt.verify(splitJWT[1], process.env.JWT_SECRET, (err, result)=>{
        if(err){
            res.status(100).json({status: false, message: 'Not Verify'})
        }else{
            PatientModel.findOne({email: result.email}, (err, authPatient)=>{
                if(err){
                    res.status(300).json({status: false, message: 'User not found'})
                }else{
                    res.status(200).json({status: true, authPatient})
                }
            })
        }
    })
}

const allpat=(request,response)=>{
  PatientModel.find( (err,pat)=>{
    response.send(pat)
})
}
const deletePat=(request,response)=>{
    patientModel.deleteOne({_id:request.body._id}, (err)=>{
        if(err){
            response.send({status:false,message:'server error, try again'})
        }else{
            response.send({status:true,message:'operation successful'})
        }
    })

}

const updatePat=(request,response)=>{
    // response.send(request.body)
    console.log(999)
    patientModel.findByIdAndUpdate(request.body._id,request.body, (err)=>{
        if(err){
            response.send({status:false,message:'server error, try again'})
        }else{
            response.send({status:true,message:'operation successful'})
        }
    })

}


module.exports={ getLandingPage,registerPatient,updatePat, retrievePatientId, login,allpat, authenticatePatient,deletePat }
