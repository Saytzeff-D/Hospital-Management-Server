const mongoose = require('mongoose')

const appointmentSchema = mongoose.Schema({
    appointmentNo: String,
    healthId: String,
    appointmentDate: String,
    specialist: String,
    doctorName: String,
    shift: String,
    timeSlot: String,
    appointmentPriority: String,
    message: String,
    paymentStatus: {type: Boolean, default: false},
    prescriptionStatus: {type: Boolean, default: false}
})

const AppointmentModel = mongoose.model('appointment_tbs', appointmentSchema)
module.exports = AppointmentModel