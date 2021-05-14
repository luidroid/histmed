const express = require("express");

const {
  createPatient,
  readPatients,
  updatePatient,
  deletePatient,
} = require("../controllers/patient_controller");

const router = express.Router();

router
  .post("/", createPatient)
  .get("/", readPatients)
  .put("/:id", updatePatient)
  .delete("/:id", deletePatient);

module.exports = router;
