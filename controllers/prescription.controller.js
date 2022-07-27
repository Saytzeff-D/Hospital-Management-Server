const AppointmentModel = require("../model/appointment.model")
const PrescriptionModel = require("../model/prescription.model")

const addPresc=(request,response)=>{
  let details = request.body
    request.body.prescriptionId=`PRES${Math.floor(Math.random()*10000)}`
    let form = new PrescriptionModel(request.body)
    form.save(err=>{
      if(!err){
        AppointmentModel.findOneAndUpdate({appointmentNo: details.appointmentNo}, {prescriptionStatus}, (err, result)=>{
          if(!err){
            response.send({status:true, message:'Prescription Sent.'})
          }else{
            response.status(501).send({status:false,message:'Internal server error, Try again.'})
          }
        })
      }else{
        response.status(501).send({status:false,message:'Internal server error, Try again.'})
      }
    })
  }
  const fetchAllPresc = (request,response)=>{
    PrescriptionModel.find((err,result)=>{
      if(!err){
        response.send({status:true,result, message:'Fetched succesfully'})
      }else{
        response.send({status:false, message:'Internal Server error'})
      }
    })
  
  }

module.exports = { addPresc, fetchAllPresc }