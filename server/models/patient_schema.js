const { Schema, model } = require("mongoose");

const patientSchema = new Schema(
  {
    reference: { type: String },
    avatar: { type: String },
    salutation: { type: String },
    firstname: {
      type: String,
      required: [true, "firstname field is required"],
    },
    lastname: { type: String, required: [true, "firstname field is required"] },
    birth: { type: Date },
    gender: { type: String, enum: ["F", "M", "O"] },
    dni: { type: String },
    email: { type: String },
    phone: { type: String },
    mobile: { type: String },
    address: { type: String },
    historyList: { type: String },
    appointments: { type: String },
    notes: { type: String },
  },
  { timestamps: true }
);

module.exports = model("patients", patientSchema);
