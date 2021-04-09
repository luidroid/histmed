import React from "react";
import { Gender } from "../models/patient";

type Props = {
  gender: Gender;
};
export default function PatientGender({ gender }: Props) {
  let displayGender = "";

  switch (gender) {
    case Gender.Male:
      displayGender = "Masculino";
      break;
    case Gender.Female:
      displayGender = "Femenino";
      break;

    default:
      displayGender = "Otro";
      break;
  }

  return <React.Fragment>{displayGender}</React.Fragment>;
}
