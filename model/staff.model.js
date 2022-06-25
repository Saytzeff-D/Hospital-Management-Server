const mongoose = require("mongoose");

const staffSchema = mongoose.Schema({
  fullName: String,
  email: String,
  password: String,
  phone: String,
})

StaffModel = mongoose.model("staff_tbs", staffSchema);

module.exports = StaffModel;