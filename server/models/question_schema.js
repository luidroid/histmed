const { Schema, model } = require("mongoose");

const questionSchema = new Schema(
  {
    questions: {
      type: [String],
      required: [true, "question field is required"],
    },
  },
  { timestamps: true }
);

module.exports = model("questions", questionSchema);
