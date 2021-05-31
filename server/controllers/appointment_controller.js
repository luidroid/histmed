"use strict";

const Appointment = require("../models/appointment_schema");

const createAppointment = (req, res) => {
  Appointment.create(req.body)
    .then((data) => {
      console.log("New Appointment created!", data);
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

const readPatientAppointments = (req, res) => {
  Appointment.find({ person: req.params.id })
    .then((data) => {
      console.log("Patient appointments found!");
      res.status(200).json(data);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json(err);
    });
};
const readAppointments = (req, res) => {
  Appointment.find()
    .populate("person")
    .then((data) => {
      console.log("Appointments found!");
      res.status(200).json(data);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json(err);
    });
};

const readAppointment = (req, res) => {
  Appointment.findById(req.params.id)
    .populate("person")
    .then((data) => {
      console.log("Appointment found!");
      res.status(200).json(data);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json(err);
    });
};

const updateAppointment = (req, res) => {
  Appointment.findByIdAndUpdate(req.params.id, req.body, {
    useFindAndModify: false,
    new: true,
  })
    .then((data) => {
      console.log("Appointment updated!");
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

const deleteAppointment = (req, res) => {
  Appointment.findById(req.params.id)
    .then((data) => {
      if (!data) {
        throw new Error("Appointment not available");
      }
      return data.remove();
    })
    .then((data) => {
      console.log("Appointment removed!");
      res.status(200).json(data);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json(err);
    });
};

module.exports = {
  createAppointment,
  readPatientAppointments,
  readAppointments,
  readAppointment,
  updateAppointment,
  deleteAppointment,
};
