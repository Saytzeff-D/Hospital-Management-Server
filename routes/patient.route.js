const express= require('express');
const { addAppointment, fetchAppointments, payAppointmentBill } = require('../controllers/appointment.controller');
const { authenticatePatient, allPatient, retrievePatientId, updatePat, deletePat, login, registerPatient } = require('../controllers/patient.controller');
const patientRouter=express.Router()


patientRouter.post('/register', registerPatient);
patientRouter.post("/login",  login);
patientRouter.post("/deletePat",  deletePat);
patientRouter.post("/updatePat",  updatePat);
patientRouter.post('/retrievePatientId',  retrievePatientId)
patientRouter.get("/allPatient",  allPatient);
patientRouter.get('/authPatient',  authenticatePatient)
patientRouter.post('/addAppointment', addAppointment)
patientRouter.post('/fetchAppointments', fetchAppointments)
patientRouter.post('/payAppointment', payAppointmentBill)


module.exports = patientRouter