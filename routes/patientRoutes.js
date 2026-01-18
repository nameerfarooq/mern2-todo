import express from "express";
import { addPatient, getPatient } from "../controllers/patientControllers.js";

const router = express.Router();

router.post("/patient", addPatient);
router.get("/patient", getPatient);

export default router;
