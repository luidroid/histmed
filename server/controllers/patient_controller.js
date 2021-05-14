"use strict";

const Patient = require("../models/patient_schema");

const createPatient = (req, res) => {
  Patient.create(req.body)
    .then((data) => {
      console.log("New Patient Created!", data);
      res.status(201).json(data);
    })
    .catch((err) => {
      if (err.name === "ValidationError") {
        console.error("Error Validating!", err);
        res.status(422).json(err);
      } else {
        console.error(err);
        res.status(500).json(err);
      }
    });
};

const readPatients = (req, res) => {
  Patient.find()
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json(err);
    });
};

const updatePatient = (req, res) => {
  Patient.findByIdAndUpdate(req.params.id, req.body, {
    useFindAndModify: false,
    new: true,
  })
    .then((data) => {
      console.log("Patient updated!");
      res.status(201).json(data);
    })
    .catch((err) => {
      if (err.name === "ValidationError") {
        console.error("Error Validating!", err);
        res.status(422).json(err);
      } else {
        console.error(err);
        res.status(500).json(err);
      }
    });
};

const deletePatient = (req, res) => {
  Patient.findById(req.params.id)
    .then((data) => {
      if (!data) {
        throw new Error("Patient not available");
      }
      return data.remove();
    })
    .then((data) => {
      console.log("Patient removed!");
      res.status(200).json(data);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json(err);
    });
};

module.exports = {
  createPatient,
  readPatients,
  updatePatient,
  deletePatient,
};
