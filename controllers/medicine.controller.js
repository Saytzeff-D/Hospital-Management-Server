const MedicineModel = require("../model/medicine.model")

const addMedicine=(request,response)=>{
    let medicineName = request.body.medicineName.toUpperCase()
    request.body.medicineName = medicineName
    request.body.availableQty = request.body.unit
  
  
    MedicineModel.findOne({medicineName:medicineName}, (err,result)=>{
      if(err){
        response.status(501).send({status:false,message:'internal server error'})
  
      }else{
        if(result){
          console.log(result)
          let drug = result
          drug.unit = request.body.unit
          console.log(drug.availableQty,request.body.availableQty)
          drug.availableQty = Number(drug.availableQty)+Number(request.body.availableQty)
          console.log(drug)
          updateDrug(drug, response)
        }else{
          let form = new MedicineModel(request.body)
          form.save(err=>{
            if(!err){
              response.send({status:true,message:'item succesfully saved'})}else{
        response.status(501).send({status:false,message:'internal server error'})
        }
          })       
           }
           }
  
    })
  }
  
  const updateDrug=(drug, response)=>{
    MedicineModel.findByIdAndUpdate(drug._id, drug, (err)=>{
      if(!err){
        response.send({status:true,message:'item updated'})
      }else{
        response.send({status:false})
      }
      })
  }
let medFunc = { addMedicine }
module.exports = medFunc