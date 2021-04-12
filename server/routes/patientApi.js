const express = require("express");

const {
  createPatient,
  readPatient,
  updatePatient,
  deletePatient,
} = require("../controllers/patient_controller");

const router = express.Router();

router
  .post("/", createPatient)
  .get("/", readPatient)
  .put("/:id", updatePatient)
  .delete("/:id", deletePatient);

module.exports = router;
