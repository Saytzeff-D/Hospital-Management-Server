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
    message: String
})

const AppointmentModel = mongoose.model('appointment_tbs', appointmentSchema)
module.exports = AppointmentModel