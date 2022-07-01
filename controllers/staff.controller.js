const StaffModel = require("../model/staff.model")
const bcrypt=require('bcryptjs')
const jwt=require('jsonwebtoken')

const registerStaff=(request,response)=>{
let staffDetails=request.body
staffDetails.created= new Date().toLocaleTimeString()
console.log(staffDetails)
StaffModel.findOne({email:staffDetails.email}, (err,result)=>{
  if(err){
    response.status(501).send({status:false,message: 'Internal Server Error'})
    }else{
      if(result){
        response.send({status:true,message: 'This user has been registered already'})
        }else{
          let form= new StaffModel(staffDetails)
          form.save( (err)=>{
            if(err){
              console.log(err)
              response.status(501).send({status:false, message:' Internal Server error'})
              }else{
                response.send({status:true, message:'registration succesful'})
          }
        })
      }
    }
  })
}

const login = (req, res) => {
  const details = req.body;
  let email=details.email
  let secret= process.env.JWT_SECRET
  StaffModel.findOne({email: details.email}, (err, response) => {
    if(err) {
      res.status(501).send({status: false, message: "Internal Server Error"});
    }else{
      if(!response){
        res.send({status: false, message: "Invalid Email address"});
      }else{
        bcrypt.compare(details.password,response.password, (err,same)=>{
        console.log(same)
        if(err){
          res.status(501).send({status: false, message: "Internal Server Error"});
          }else{
            if(same){
              const token=jwt.sign({email}, secret, {expiresIn:'60m'})
              console.log(token)
              res.send({message:'correct password',details:response, status:true,token})
              console.log('login')
              } else{
                res.send({status:false, message: 'incorrect password'})
              }
            }
        })
    }}
 })
}

const allstaffs=(request,response)=>{
  StaffModel.find( (err,staffs)=>{
    response.send(staffs)
})
}




module.exports = { login,registerStaff,allstaffs }