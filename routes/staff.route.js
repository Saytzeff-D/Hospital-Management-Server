const staffRouter = require("express").Router();
const { allAppointments, checkAppointment, updateAppointment } = require("../controllers/appointment.controller");
const { registerStaff, login, allstaffs, authenticateStaff, getDashboardInfo, getPatDetails, deleteStaff, allFinances } = require('../controllers/staff.controller')
const { addMedicine,allMedicine,updateDrug,delMedicine } = require("../controllers/medicine.controller");
const { addBirth, fetchAllBirth, addToMortality, fetchAllMortality } = require("../controllers/records.controller");
const { addPresc, fetchAllPresc } = require("../controllers/prescription.controller");
const { generatePharmBill, allPharmacyBill } = require("../controllers/pharmBills.controller");

staffRouter.post('/register', registerStaff);
staffRouter.post("/login", login);
staffRouter.get("/allStaffs", allstaffs);
staffRouter.get("/dashboard", authenticateStaff);
staffRouter.get('/getDashboardInfo',getDashboardInfo)
staffRouter.get("/allAppointments", allAppointments)
staffRouter.post('/checkAppointment',checkAppointment)
staffRouter.post('/getPat', getPatDetails)
staffRouter.post('/updateApp', updateAppointment)
staffRouter.post('/addMedicine', addMedicine)
staffRouter.post('/updateMed', updateDrug)
staffRouter.post('/delMedicine', delMedicine)
staffRouter.post('/addBirth', addBirth)
staffRouter.get('/getBirth', fetchAllBirth)
staffRouter.post('/addDeath', addToMortality)
staffRouter.get('/getDeath', fetchAllMortality)
staffRouter.get('/allMedicines', allMedicine)
staffRouter.post('/addPrescription', addPresc)
staffRouter.get('/allPrescription', fetchAllPresc)
staffRouter.post('/createPharmBill', generatePharmBill)
staffRouter.get('/pharmacyBills', allPharmacyBill)
staffRouter.delete('/delete', deleteStaff)
staffRouter.get('/finance', allFinances)

module.exports = staffRouter