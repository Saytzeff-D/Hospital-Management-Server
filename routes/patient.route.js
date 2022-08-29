const express = require('express');
const { addAppointment, fetchAppointments, payAppointmentBill, getPatInfo, delAppointment } = require('../controllers/appointment.controller');
const { patientPharmBillRecord, payPharmacyBill } = require('../controllers/pharmBills.controller');
const { authenticatePatient, allPatient, retrievePatientId, updatePat, deletePat, login, registerPatient,updatePhoto } = require('../controllers/patient.controller');
const patientRouter = express.Router()


patientRouter.post('/register', registerPatient);
patientRouter.post("/login", login);
patientRouter.post("/deletePat", deletePat);
patientRouter.post("/updatePat", updatePat);
patientRouter.post('/retrievePatientId', retrievePatientId)
patientRouter.get("/allPatient", allPatient);
patientRouter.get('/authPatient', authenticatePatient)
patientRouter.post('/addAppointment', addAppointment)
patientRouter.post('/fetchAppointments', fetchAppointments)
patientRouter.post('/payAppointment', payAppointmentBill)
patientRouter.post('/getInfo', getPatInfo)
patientRouter.post('/pharmacyBills', patientPharmBillRecord)
patientRouter.post('/payPharmBill', payPharmacyBill)
patientRouter.delete('/delAppoint', delAppointment)
patientRouter.post('/updatePhoto', updatePhoto)


module.exports = patientRouter