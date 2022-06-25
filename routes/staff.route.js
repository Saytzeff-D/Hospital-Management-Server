const staffRouter = require("express").Router();
const staffController = require("../controllers/staff.controller");

staffRouter.post("/login", staffController.login);

module.exports = staffRouter