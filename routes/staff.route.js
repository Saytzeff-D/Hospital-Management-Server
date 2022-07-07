const staffRouter = require("express").Router();
const staffController = require("../controllers/staff.controller");

staffRouter.post('/register',staffController.registerStaff);
staffRouter.post("/login", staffController.login);
staffRouter.get("/allStaffs", staffController.allstaffs);
staffRouter.get("/dashboard", staffController.authenticateStaff);


module.exports = staffRouter
