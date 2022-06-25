const StaffModel = require("../model/staff.model")

const login = (req, res) => {
  const details = req.body;
  StaffModel.findOne({email: details.email}, (err, response) => {
    if(err) {
      res.status(501).send({status: false, message: "Internal Server Error"});
    } else {
      if (!response) {
        res.send({status: false, message: "Invalid Email address"});
      } else {
        if(response.password == details.password) {
          res.send({status: true, message: "Login successful"});
        } else {
          res.send({status: false, message: "Wrong password"});
        }
      }
    }
  })
}

module.exports = { login }