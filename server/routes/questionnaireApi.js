const express = require("express");

const {
  createQuestionnaire,
  readQuestionnaires,
  readQuestionnaire,
  updateQuestionnaire,
  deleteQuestionnaire,
} = require("../controllers/questionnaire_controller");

const router = express.Router();

router
  .post("/", createQuestionnaire)
  .get("/", readQuestionnaires)
  .get("/:id", readQuestionnaire)
  .put("/:id", updateQuestionnaire)
  .delete("/:id", deleteQuestionnaire);

module.exports = router;
