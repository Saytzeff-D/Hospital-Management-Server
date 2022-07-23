const NatalityModel = require("../model/natalityRecord.model.")
const MortalityModel = require("../model/mortalityRecord.model")

const addBirth=(request,response)=>{
    let details=request.body
    details.recordsId=`BREF${Math.floor(Math.random()*10000)}`
    NatalityModel.findOne({childName:details.childName}, (err,result)=>{
      if(!err){
        if(result){
          response.send({status:false, message:'This record already exist'})
        }else{
          let form=new NatalityModel(details)
          form.save( (err)=>{
            if(!err){
              response.send({status:true, message:'Record succesfully saved.'})
  
            }else{
              response.status(501).send({status:false,message:'Internal server error, Try again.'})
            }
  
          })
        }
  
      }else{
        response.status(501).send({status:false,message:'Internal server error, Try again.'})
      }
    })
  }
  const fetchAllBirth = (request,response)=>{
    NatalityModel.find((err,result)=>{
      if(!err){
        response.send({status:true,babies:result, message:'Fetched succesfully'})
      }else{
        response.send({status:false, message:'internal Server error'})
      }
    })
  
  }
  
  const addToMortality = (request,response)=>{
    let details=request.body
    details.recordsId=`DREF${Math.floor(Math.random()*10000)}`
    console.log(details.patientName)
    MortalityModel.findOne({patientName:details.patientName}, (err,result)=>{
      if(!err){
        if(result){
          response.send({status:false, message:'This record already exist'})
        }else{
          let form=new MortalityModel(details)
          form.save( (err)=>{
            if(!err){
              updateMortality(details._id,response)          
            }else{
              response.status(501).send({status:false,message:'Internal server error, Try again.'})
            }
  
          })
        }
  
      }else{
        response.status(501).send({status:false,message:'Internal server error, Try again.'})
      }
    })
  }
  
  const fetchAllMortality = (request,response)=>{
    MortalityModel.find((err,result)=>{
      if(!err){
        response.send({status:true,result, message:'Fetched succesfully'})
      }else{
        response.send({status:false, message:'internal Server error'})
      }
    })
  
  }
  
  const updateMortality=(healthId,response)=>{
    console.log(healthId)
    PatientModel.findByIdAndUpdate({_id:healthId},{mortality:true}, (err)=>{
      if(!err){
        response.send({status:true,message:'Saved succesfully'})
      }else{
        response.send({status:false, message:'internal Server error'})
      }
    })
  }

module.exports = { addBirth, fetchAllBirth, fetchAllMortality, updateMortality, addToMortality }