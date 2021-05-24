const { Schema, model } = require("mongoose");

const patientSchema = new Schema(
  {
    avatar: { type: String },
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
    historyList: [{ name: String, description: String }],
    appointments: [{ type: Schema.Types.ObjectId, ref: "Appointment" }],
    notes: { type: String },
  },
  { timestamps: true }
);

module.exports = model("Patient", patientSchema);
