const express = require("express");

const {
  createAppointment,
  readPatientAppointments,
  readAppointments,
  readAppointment,
  updateAppointment,
  deleteAppointment,
} = require("../controllers/appointment_controller");

const router = express.Router();

router
  .post("/", createAppointment)
  .get("/:id/patient", readPatientAppointments)
  .get("/", readAppointments)
  .get("/:id", readAppointment)
  .put("/:id", updateAppointment)
  .delete("/:id", deleteAppointment);

module.exports = router;
