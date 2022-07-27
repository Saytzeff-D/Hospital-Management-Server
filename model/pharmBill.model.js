const mongoose = require('mongoose')

const pharmacyBillSchema = mongoose.Schema({
    billNo: String,
    healthId: String,
    illness: String,
    created: String,
    doctorName: String,
    prescriptionId: String,
    medicineTray: Array,
    amount: String,
    paidAmount: { default: 0.00, type: String },
    paymentStatus: {type:Boolean,default: false }
})

const PharmBillModel = mongoose.model('pharmBillRecords_tbs', pharmacyBillSchema)
module.exports = PharmBillModel