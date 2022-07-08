const express= require('express')
const patientRouter=express.Router()
const patientController= require('../controllers/patient.controller')


patientRouter.get('/',patientController.allpat);
patientRouter.post('/register',patientController.registerPatient);
patientRouter.post("/login", patientController.login);
patientRouter.post("/deletePat", patientController.deletePat);
patientRouter.post("/updatePat", patientController.updatePat);
patientRouter.post('/retrievePatientId', patientController.retrievePatientId)
patientRouter.get("/allpat", patientController.allpat);
patientRouter.get('/authPatient', patientController.authenticatePatient)



module.exports=patientRouter