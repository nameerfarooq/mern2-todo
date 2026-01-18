import { Patient } from "../models/patientModel.js";

// API for adding todos
export const addPatient = async (req, res) => {
  try {
    console.log("req.body => ", req.body);

    const patient = Patient(req.body);

    await patient.save();

    return res.status(201).json({ message: "Success", data: patient });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
};
export const getPatient = async (req, res) => {
  try {
    const patients = await Patient.find();
    res.status(200).json({ data: patients });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
