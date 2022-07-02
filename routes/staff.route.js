const staffRouter = require("express").Router();
const staffController = require("../controllers/staff.controller");

staffRouter.post('/register',staffController.registerStaff);
staffRouter.post("/login", staffController.login);
staffRouter.get("/allstaffs", staffController.allstaffs);

module.exports = staffRouter
