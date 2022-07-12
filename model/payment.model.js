const mongoose = require('mongoose')
const paymentSchema = mongoose.Schema({
    paymentRef: String,
    paymentType: String,
    amount: String,
    healthId: String
})