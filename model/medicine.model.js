const mongoose = require('mongoose')
const medicineSchema = mongoose.Schema({
    medicineName: String,
    medicineCategory: String,
    medicineCompany: String,
    unit: String,
    pricePerUnit: String,
    availableQty: String
})

const MedicineModel = mongoose.model('medStock_tbs', medicineSchema)
module.exports = MedicineModel

