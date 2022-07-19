const MedicineModel = require("../model/medicine.model")

const addMedicine=(request,response)=>{
  request.body.availableQty=request.body.unit
  let form = new MedicineModel(request.body)
  form.save(err=>{
    if(!err){
      response.send({status:true,message:'Medicine Successfully Added'})}else{
        response.status(501).send({status:false,message:'internal server error'})
        }
      })
    }
  
  const updateDrug=(request, response)=>{
    MedicineModel.findByIdAndUpdate(request.body._id,request.body, (err)=>{
      if(!err){
        response.send({status:true,message:'item updated'})
      }else{
        response.send({status:false})
      }
    })
  }
const allMedicine=(request,response)=>{
  MedicineModel.find( (err,result)=>{
    if(!err){
      response.send({status:true,drugs:result})
    }else{
      response.send({status:false,message:'internal server error'})
    }
  })

}
const delMedicine=(request,response)=>{
  console.log(request.body)
  MedicineModel.deleteOne({_id:request.body._id},(err)=>{
    if(!err){
      response.send({status:true,message:'item deleted succesfully'})
    }else{
      response.status(501).send({status:false})
    }
  })


}

let medFunc = { addMedicine,allMedicine,updateDrug,delMedicine }
module.exports = medFunc