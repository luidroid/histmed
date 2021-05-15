const { Schema, model } = require("mongoose");

const appointmentSchema = new Schema(
  {
    person: { type: Schema.Types.ObjectId, ref: "Patient" },
    title: {
      type: String,
      required: [true, "title field is required"],
    },
    description: { type: String },
    category: { type: String, enum: ["T", "C", "S", "O", "P"], default: "T" },
    scheduled: { type: String },
    analysis: { type: String },
    plan: { type: String },
    comment: { type: String },
    recommendation: { type: String },
    status: { type: String, enum: ["O", "I", "D", "P", "C"], default: "O" },
  },
  { timestamps: true }
);

module.exports = model("Appointment", appointmentSchema);
