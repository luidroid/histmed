const express = require("express");

const {
  createQuestion,
  readQuestion,
  updateQuestion,
  deleteQuestion,
} = require("../controllers/question_controller");

const router = express.Router();

router
  .post("/", createQuestion)
  .get("/", readQuestion)
  .put("/:id", updateQuestion)
  .delete("/:id", deleteQuestion);

module.exports = router;
