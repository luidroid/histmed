const express = require("express");

const {
  createAppointment,
  readAppointments,
  updateAppointment,
  deleteAppointment,
} = require("../controllers/appointment_controller");

const router = express.Router();

router
  .post("/", createAppointment)
  .get("/", readAppointments)
  .put("/:id", updateAppointment)
  .delete("/:id", deleteAppointment);

module.exports = router;
