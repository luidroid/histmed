"use strict";

const Questionnaire = require("../models/questionnaire_schema");

const createQuestionnaire = (req, res) => {
  Questionnaire.create(req.body)
    .then((data) => {
      console.log("New Questionnaire created!", data);
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

const readQuestionnaires = (req, res) => {
  Questionnaire.find()
    .then((data) => {
      console.log("Questionnaires found!");
      res.status(200).json(data);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json(err);
    });
};

const readQuestionnaire = (req, res) => {
  Questionnaire.findById(req.params.id)
    .then((data) => {
      console.log("Questionnaire found!");
      res.status(200).json(data);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json(err);
    });
};

const updateQuestionnaire = (req, res) => {
  Questionnaire.findByIdAndUpdate(req.params.id, req.body, {
    useFindAndModify: false,
    new: true,
  })
    .then((data) => {
      console.log("Questionnaire updated!");
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

const deleteQuestionnaire = (req, res) => {
  Questionnaire.findById(req.params.id)
    .then((data) => {
      if (!data) {
        throw new Error("Questionnaire not available");
      }
      return data.remove();
    })
    .then((data) => {
      console.log("Questionnaire removed!");
      res.status(200).json(data);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json(err);
    });
};

module.exports = {
  createQuestionnaire,
  readQuestionnaires,
  readQuestionnaire,
  updateQuestionnaire,
  deleteQuestionnaire,
};
