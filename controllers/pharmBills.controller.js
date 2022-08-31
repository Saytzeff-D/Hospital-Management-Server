const MedicineModel = require("../model/medicine.model")
const PaymentModel = require("../model/payment.model")
const PharmBillModel = require("../model/pharmBill.model")
const PrescriptionModel = require("../model/prescription.model")

const generatePharmBill = (req, res)=>{
    const details = req.body
    details.billNo = `PHARMA${Math.floor(Math.random() * 123456)}`
    details.created = new Date().toISOString()
    const bill = new PharmBillModel(details)
    details.medicineTray.map((each, i)=>{
        MedicineModel.findById(each.drug_id, (err, result)=>{
            if(err){
                res.status(300).json({message: 'Drug not in Pharmacy'})
            }else{
                if (result == null) {
                    res.status(300).json({message: `${each.medicineName} typed category could not be found in Pharmacy`})
                } else {
                    let newAvailableQty = parseInt(result.availableQty) - parseInt(each.unit)
                    MedicineModel.findByIdAndUpdate(each.drug_id, {availableQty: newAvailableQty}, (error)=>{
                        if(!error){
                            console.log(`Done with Medicine of Index ${i}`)
                        }else{ }
                    })
                }
            }
        })
    })
    bill.save((err)=>{
        if(err){
            res.status(300).json({message: 'Internal Sever Error'})
        }else{
            PrescriptionModel.findOneAndUpdate({prescriptionId: details.prescriptionId}, {billStatus: true}, {upsert: true}, (err, result)=>{
                if(err){
                    res.status(300).json({message: 'Prescription not found'})
                }else{
                    res.status(200).json({message: 'Success'})
                }
            })
        }
    })
}
const patientPharmBillRecord = (req, res)=>{
    PharmBillModel.find({healthId: req.body.healthId}, (err, result)=>{
        if(err){
            res.status(100).json({message: 'Unable to fetch'})
        }else{
            res.status(200).json({bill: result})
        }
    })
}
const allPharmacyBill = (req, res)=>{
    PharmBillModel.find((err, result)=>{
        if(!err){
            res.status(200).json({bills: result})
        }else{
            res.status(300).json({message: 'Server Error'})
        }
    })
}
const payPharmacyBill = (req, res)=>{
    const details = req.body
    details.created = new Date().toISOString()
    let pay = new PaymentModel(details)
    console.log(details._id)
    pay.save((err)=>{
        if(err){
            throw err
        }else{
            PharmBillModel.findByIdAndUpdate(details._id, {paymentStatus: true}, (err)=>{
                if (err) {
                    res.status(300).json({message: 'Unable to update'})
                } else {
                    res.status(200).json({message: 'Success'})
                }
            })
        }
    })
}

module.exports = { generatePharmBill, patientPharmBillRecord, allPharmacyBill, payPharmacyBill }