const AppointmentModel = require("../model/appointment.model")
const PaymentModel = require("../model/payment.model")

const addAppointment=(request,response)=>{
    let appointmentDetails = request.body
    appointmentDetails.appointmentNo =`APP${Math.ceil(Math.random()*100000)}`
    let form = new AppointmentModel(appointmentDetails)
    form.save((err)=>{
        if(!err){
            response.send({status:true})
        }else{
            response.status(501).send({status:false, message:'Internal server error'})
        }
    })
}
const fetchAppointments=(request,response)=>{
 let details = request.body
 AppointmentModel.find({healthId: details.healthId}, (err,result)=>{
    if(!err){
        response.send({status:true,appointments:result})
    }else{
        response.status(501).send({status:false, message:'Internal server error'})
    }
    
}
 )
}
const payAppointmentBill = (req, res)=>{
    let details = req.body
    console.log(details.appointment)
    AppointmentModel.findByIdAndUpdate(details.appointment.appointmentNo, {paymentStatus: true, approvalStatus: true}, (err, result)=>{
        console.log(err)
        if (err) {
            res.status(300).json({message: 'Server Error'})            
        } else {
            console.log(result)
            let form = PaymentModel(details.payment)
            form.save((err)=>{
                if(!err){
                    res.status(200).json({status: true})
                }else{
                    res.status(300).json({message: 'Unable to add payment record'})
                }
            })
        }
    })
}
const allAppointments=(request,response)=>{
    AppointmentModel.find( (err,result)=>{
      if(!err){
        response.send({status:true, appointments:result})
      }else{
        response.status(501).send({status:false, message:'Server error'})
      }
    })
  }
  const checkAppointment=(request,response)=>{
    AppointmentModel.findByIdAndUpdate(request.body._id, {approvalStatus:true},(err)=>{
      if(!err){
        response.send({status:true})
      }else{
        response.status(501).send({status:false})
      }
      
    })
  
  }
  const updateAppointment = (request,response)=>{
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

let appointmentFunc = { addAppointment, fetchAppointments, payAppointmentBill, allAppointments, checkAppointment, updateAppointment }
module.exports = appointmentFunc