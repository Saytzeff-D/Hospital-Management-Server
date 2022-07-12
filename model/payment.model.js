const mongoose = require('mongoose')
const paymentSchema = mongoose.Schema({
    paymentRef: String,
    paymentType: String,
    amount: String,
    healthId: String,
    created: String
})

const PaymentModel = mongoose.model('payment_tbs', paymentSchema)
module.exports = PaymentModel