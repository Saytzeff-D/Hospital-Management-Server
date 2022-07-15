const staffRouter = require("express").Router();
const staffController = require("../controllers/staff.controller");

staffRouter.post('/register',staffController.registerStaff);
staffRouter.post("/login", staffController.login);
staffRouter.get("/allStaffs", staffController.allstaffs);
staffRouter.get("/dashboard", staffController.authenticateStaff);
staffRouter.get('/getDashboardInfo',staffController.getDashboardInfo)
staffRouter.get("/allAppointments", staffController.allAppointments);
staffRouter.post('/checkAppointment',staffController.checkAppointment)
staffRouter.post('/getPat',staffController.getPatDetails)
staffRouter.post('/updateApp',staffController.updateApp)
staffRouter.post('/addMedicine',staffController.addMedicine)
module.exports = staffRouter
