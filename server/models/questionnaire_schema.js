const { Schema, model } = require("mongoose");

const questionnaireSchema = new Schema(
  {
    name: { type: String, required: [true, "name field is required"] },
    questions: {
      type: [String],
      required: [true, "question field is required"],
    },
  },
  { timestamps: true }
);

module.exports = model("Questionnaire", questionnaireSchema);
