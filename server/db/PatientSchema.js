const mongoose = require("mongoose");
const PatientSchema = new mongoose.Schema({
  ImgUrl: {
    type: String,
    required: true,
  },
  Status: {
    type: String,
    required: true,
  },
  Name: {
    type: String,
    required: true,
  },
  File_No: {
    type: String,
    required: true,
  },
  Passport_No: {
    type: String,
    required: true,
  },
  Gender: {
    type: String,
    required: true,
  },
  Date_of_Birth: {
    type: String,
    required: true,
  },
  Age: {
    type: String,
    required: true,
  },
  Phone: {
    type: String,
    required: true,
  },
  Reg_Date: { type: String, required: true },
  Report_Date: {
    type: String,
    required: true,
  },
});
module.exports = mongoose.model("Patient", PatientSchema);
