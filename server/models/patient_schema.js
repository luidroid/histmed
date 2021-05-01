const { Schema, model } = require("mongoose");

const patientSchema = new Schema(
  {
    dni: {
      type: String,
    },
    avatar: {
      type: String,
    },
    salutation: { type: String },
    name: {
      first: { type: String, required: [true, "firstname field is required"] },
      second: { type: String },
      last: { type: String, required: [true, "firstname field is required"] },
      lastMore: { type: String },
    },
    gender: { type: String },
    birth: { type: Date },
    email: { type: String },
    phone: {
      main: { type: String },
      mobile: { type: String },
    },
    address: {
      street: { type: String },
      streetMore: { type: String },
      houseNumber: { type: String },
      city: { type: String },
      district: { type: String },
      country: { type: String },
      postcode: { type: String },
    },
    comment: {
      type: String,
    },
    antecedents: {
      alergies: { type: String },
      pathological: { type: String },
      nonPathological: { type: String },
      heredetary: { type: String },
    },
    files: { type: Array, default: [] },
  },
  { timestamps: true }
);

module.exports = model("patients", patientSchema);
