const staffRouter = require("express").Router();
const staffController = require("../controllers/staff.controller");

staffRouter.post('/register',staffController.registerStaff);

// staffRouter.post('/register',(req,res)=>{
//     req.body.class=90
//     res.send(req.body)
// });


staffRouter.post("/login", staffController.login);


staffRouter.get("/allstaffs", staffController.allstaffs);


module.exports = staffRouter