"use strict";

const Question = require("../models/question_schema");

const createQuestion = (req, res) => {
  Question.create(req.body)
    .then((data) => {
      console.log("New Question Created!", data);
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

const readQuestion = (req, res) => {
  Question.find()
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json(err);
    });
};

const updateQuestion = (req, res) => {
  Question.findByIdAndUpdate(req.params.id, req.body, {
    useFindAndModify: false,
    new: true,
  })
    .then((data) => {
      console.log("Question updated!");
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

const deleteQuestion = (req, res) => {
  Question.findById(req.params.id)
    .then((data) => {
      if (!data) {
        throw new Error("Question not available");
      }
      return data.remove();
    })
    .then((data) => {
      console.log("Question removed!");
      res.status(200).json(data);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json(err);
    });
};

module.exports = {
  createQuestion,
  readQuestion,
  updateQuestion,
  deleteQuestion,
};
