const express= require('express')
const patientRouter=express.Router()
const patientController= require('../controllers/patient.controller')


patientRouter.get('/',patientController.allPatients);
patientRouter.post('/register',patientController.registerPatient);
patientRouter.post("/login", patientController.login);
patientRouter.post('/retrievePatientId', patientController.retrievePatientId)
patientRouter.get("/allpatient", (req,res)=>{
    console.log(999)
res.send({status:true,message:'coreect fteching'})
});



module.exports=patientRouter