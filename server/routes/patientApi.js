const express = require("express");

const {
  createPatient,
  readPatients,
  readPatient,
  readPatientAppointments,
  updatePatient,
  deletePatient,
} = require("../controllers/patient_controller");

const router = express.Router();

router
  .post("/", createPatient)
  .get("/", readPatients)
  .get("/:id", readPatient)
  .get("/:id/appointments", readPatientAppointments)
  .put("/:id", updatePatient)
  .delete("/:id", deletePatient);

module.exports = router;
