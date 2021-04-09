import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "../api/apiConfig";

import Paper from "@material-ui/core/Paper";

import { Patient } from "../models/patient";

export default function PatientDetails() {
  const { id } = useParams<{ id: string }>();
  const [patientInfo, setPatientInfo] = useState<Patient>();

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get<Patient>(`/patients/${id}`);
        setPatientInfo(data);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [id]);

  return <Paper>{patientInfo?.firstname}</Paper>;
}
