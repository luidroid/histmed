const { Schema, model } = require("mongoose");

const appointmentSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "title field is required"],
    },
    reason: { type: String },
    analysis: { type: String },
    plan: { type: String },
    comment: { type: String },
    recommendation: { type: String },
    description: { type: String },
    description: { type: String },
    description: { type: String },
  },
  { timestamps: true }
);

module.exports = model("users", questionSchema);
