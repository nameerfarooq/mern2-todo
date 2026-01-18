import mongoose from "mongoose";

const PatientSchema = new mongoose.Schema({
  name: String,
  age: Number,
  address: String,
  contactNumber: Number,
  isBillPaid: Boolean,
  billAmount: Number,
});

export const Patient = mongoose.model("Patient", PatientSchema); // todo
