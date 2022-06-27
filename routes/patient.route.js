const express= require('express')
const patientRouter=express.Router()
const patientController= require('../controllers/patient.controller')


patientRouter.get('/',patientController.getLandingPage);
patientRouter.post('/register',patientController.registerPatient);
patientRouter.post("/login", patientController.login);
patientRouter.post('/retrievePatientId', patientController.retrievePatientId)



module.exports=patientRouter