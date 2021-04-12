const { Schema, model } = require("mongoose");

const patientSchema = new Schema(
  {
    dni: {
      type: String,
      required: [true, "dni field is required"],
    },
    avatar: {
      type: String,
    },
    name: {
      first: { type: String },
      second: { type: String },
      last: { type: String },
      lastAdditional: { type: String },
    },
    birth: { type: Date },
    gender: { type: String },
    email: { type: String },
    phone: {
      main: { type: String },
      emergency: { type: String },
      other: { type: String },
    },
  },
  { timestamps: true }
);

module.exports = model("patients", patientSchema);
