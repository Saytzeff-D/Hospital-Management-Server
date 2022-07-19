const mongoose = require('mongoose')

const prescriptionSchema = mongoose.Schema({
    prescriptionId: String,
    healthId: String,
    patientName: String,
    doctorName: String,
    illness: String,
    prescribedMedicine: Array
})

const PrescriptionModel = mongoose.model('prescription_tbs', prescriptionSchema)

module.exports = PrescriptionModel