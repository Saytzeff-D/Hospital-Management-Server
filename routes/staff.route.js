const staffRouter = require("express").Router();
const { allAppointments, checkAppointment, updateAppointment } = require("../controllers/appointment.controller");
const { registerStaff, login, allstaffs, authenticateStaff, getDashboardInfo, getPatDetails,addBirth,allBirths, addDeath, allDeath, addPresc, allPres } = require('../controllers/staff.controller')
const { addMedicine,allMedicine,updateDrug,delMedicine } = require("../controllers/medicine.controller");

staffRouter.post('/register', registerStaff);
staffRouter.post("/login", login);
staffRouter.get("/allStaffs", allstaffs);
staffRouter.get("/dashboard", authenticateStaff);
staffRouter.get('/getDashboardInfo',getDashboardInfo)
staffRouter.get("/allAppointments", allAppointments);
staffRouter.post('/checkAppointment',checkAppointment)
staffRouter.post('/getPat', getPatDetails)
staffRouter.post('/updateApp', updateAppointment)
staffRouter.post('/addMedicine', addMedicine)
staffRouter.post('/updateMed',updateDrug)
staffRouter.post('/delMedicine',delMedicine)
staffRouter.post('/addBirth',addBirth)
staffRouter.get('/getBirth',allBirths)
staffRouter.post('/addDeath',addDeath)
staffRouter.get('/getDeath',allDeath)
staffRouter.get('/allMedicines',allMedicine)
staffRouter.post('/addPrescription',addPresc)
staffRouter.get('/allPrescription',allPres)

module.exports = staffRouter