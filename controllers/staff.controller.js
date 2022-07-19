const StaffModel = require("../model/staff.model")
const bcrypt=require('bcryptjs')
const jwt=require('jsonwebtoken')
const PatientModel = require("../model/patient.model")
const AppointmentModel = require("../model/appointment.model")
const BirthModel = require("../model/birthRecord.model")
const DeathModel = require("../model/deathRecord.model")

const registerStaff=(request,response)=>{
let staffDetails=request.body
StaffModel.findOne({email:staffDetails.email}, (err,result)=>{
  if(err){
    response.status(501).send({status:false,message: 'Internal Server Error'})
    }else{
      if(result){
        response.send({status:false,message: 'This user has been registered already'})
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
        if(err){
          res.status(501).send({status: false, message: "Internal Server Error"});
          }else{
            if(same){
              const token=jwt.sign({email}, secret, {expiresIn:'60m'})
              res.send({message:'correct password',details:response, status:true,token})
              } else{
                res.send({status:false, message: 'Incorrect password'})
              }
            }
        })
    }}
 })
}

const authenticateStaff=(request,response)=>{
  let splitJwt= request.headers.authorization.split(' ')
  let token = splitJwt[1]
  const secret=process.env.JWT_SECRET
  jwt.verify(token,secret, (err,result)=>{
    if(err){
      response.send({status:false,message:'Internal Server error'})
    }
    else{
      StaffModel.findOne({email:result.email}, (err,staffDetails)=>{
        if(err){
      response.send({status:false,message:'Internal Server error'})
        }else{
          response.send({status:true, message:'User Authenticated',staffDetails})
        }
      })
    }
  })


}

const allstaffs=(request,response)=>{
  StaffModel.find( (err,staffs)=>{
    response.send(staffs)
  
})
}

const getDashboardInfo=(request,response)=>{
  let patsNum=0
  StaffModel.find( (err,staffArr)=>{
    PatientModel.find( (err,pats)=>{
      AppointmentModel.find((err,appointments)=>{        
      patsNum=pats.length
      appointments=appointments.length
      response.send({status:true,staffArr,patsNum,appointments})
      })
    })
})   
}
const getPatDetails=(request,response)=>{
  PatientModel.findOne({healthId:request.body.healthId}, (err,patient)=>{
    if(!err){
      console.log(patient)
      response.send({status:true,patDetails:patient})
    }else{
      response.status(501).send({status:false})      
    }
  })
}

const updateApp=(request,response)=>{
  let id=request.body._id
  let appointmentDate=request.body.appointmentDate
  let shift=request.body.shift
  let timeSlot=request.body.timeSlot

  AppointmentModel.findByIdAndUpdate(id, {appointmentDate:appointmentDate,shift:shift,timeSlot:timeSlot}, (err)=>{
    if(!err){
      response.send({status:true})
    }else{
      response.send({status:false})
    }
    })
}
const addMedicine=(request,response)=>{
  let medicineName=request.body.medicineName.toUpperCase()
  request.body.medicineName=medicineName
  request.body.availableQty=request.body.unit


  MedicineModel.findOne({medicineName:medicineName},(err,result)=>{
    if(err){
      response.status(501).send({status:false,message:'internal server error'})

    }else{
      if(result){
        console.log(result)
        let drug=result
        drug.unit=request.body.unit
        console.log(drug.availableQty,request.body.availableQty)
        drug.availableQty= Number(drug.availableQty)+Number(request.body.availableQty)
        console.log(drug)
        updateDrug(drug,response)
      }else{
        let form= new MedicineModel(request.body)
        form.save(err=>{
          if(!err){
            response.send({status:true,message:'item succesfully saved'})}else{
              response.status(501).send({status:false,message:'internal server error'})
              }
           })       
        }
      }

  })
}

const updateDrug=(drug,response)=>{
  MedicineModel.findByIdAndUpdate(drug._id,drug, (err)=>{
    if(!err){
      response.send({status:true,message:'item updated'})
    }else{
      response.send({status:false})
    }
    })
}

const addBirth=(request,response)=>{
  let details=request.body
  details.recordsId=`BAE${Math.floor(Math.random()*10000)}`
  BirthModel.findOne({childName:details.childName}, (err,result)=>{
    if(!err){
      if(result){
        response.send({status:false, message:'This record already exist'})
      }else{
        let form=new BirthModel(details)
        form.save( (err)=>{
          if(!err){
            response.send({status:true, message:'Record succesfully saved.'})

          }else{
            response.status(501).send({status:false,message:'Internal server error, Try again.'})
          }

        })
      }

    }else{
      response.status(501).send({status:false,message:'Internal server error, Try again.'})
    }
  })
}
const allBirths=(request,response)=>{
  BirthModel.find((err,result)=>{
    if(!err){
      response.send({status:true,babies:result, message:'Fetched succesfully'})
    }else{
      response.send({status:false, message:'internal Server error'})
    }
  })

}

const addDeath=(request,response)=>{
  let details=request.body
  details.recordsId=`RIP${Math.floor(Math.random()*10000)}`
  console.log(details.patientName)
  DeathModel.findOne({patientName:details.patientName}, (err,result)=>{
    if(!err){
      if(result){
        response.send({status:false, message:'This record already exist'})
      }else{
        let form=new DeathModel(details)
        form.save( (err)=>{
          if(!err){
            response.send({status:true, message:'Record succesfully saved.'})

          }else{
            response.status(501).send({status:false,message:'Internal server error, Try again.'})
          }

        })
      }

    }else{
      response.status(501).send({status:false,message:'Internal server error, Try again.'})
    }
  })
}

const allDeath=(request,response)=>{
  DeathModel.find((err,result)=>{
    if(!err){
      response.send({status:true,result, message:'Fetched succesfully'})
    }else{
      response.send({status:false, message:'internal Server error'})
    }
  })

}

module.exports = { login,registerStaff,addBirth,allstaffs,authenticateStaff,getDashboardInfo,getPatDetails,updateApp,addMedicine,allBirths,addDeath,allDeath}