const MedicineModel = require("../model/medicine.model")
const PharmBillModel = require("../model/pharmBill.model")

const generatePharmBill = (req, res)=>{
    const details = req.body
    details.billNo = `PHARMA${Math.floor(Math.random() * 123456)}`
    details.date = new Date().toISOString()
    const bill = new PharmBillModel(details)
    details.medicineTray.map((each, i)=>{
        MedicineModel.findById({_id: each.drug_id}, (err, result)=>{
            if(err){
                throw err
            }else{
                let newAvailableQty = parseInt(result.availableQty) - parseInt(each.unit)
                MedicineModel.findByIdAndUpdate(each._id, {availableQty: newAvailableQty}, (error)=>{
                    if(!error){
                        console.log(`Done with Medicine of Index ${i}`)
                    }else{
                        throw error
                    }
                })
            }
        })
    })
    bill.save((err)=>{
        if(err){
            res.status(300).json({message: 'Internal Sever Error'})
        }else{
            res.status(200).json({message: 'Success'})
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
    const _id = req.body._id
    PharmBillModel.findByIdAndUpdate(_id, {paymentStatus: true}, (err)=>{
        if (err) {
            res.status(300).json({message: 'Unable to update'})
        } else {
            res.status(200).json({message: 'Success'})
        }
    })
}

module.exports = { generatePharmBill, patientPharmBillRecord, allPharmacyBill, payPharmacyBill }