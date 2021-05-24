import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "../api/apiConfig";

import { Patient } from "../models/patient";
import { initPatient } from "../api/patientService";
import PatientInfo from "../components/PatientInfo";

import { Grid } from "@material-ui/core/";

import PatientHistory from "./PatientHistory";
import PatientAppointments from "./PatientAppointments";
import PatientAttachments from "./PatientAttachments";

export default function PatientDetails() {
  const { id } = useParams<{ id: string }>();
  const [info, setPatientInfo] = useState<Patient>(initPatient);

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

  return (
    <React.Fragment>
      <Grid item xs={12} md={8} lg={8}>
        <PatientInfo {...info}></PatientInfo>
        <PatientHistory historyList={info.historyList}></PatientHistory>
      </Grid>

      <Grid item xs={12} md={4} lg={4}>
        <PatientAppointments
          appointments={info.appointments}
        ></PatientAppointments>{" "}
        <PatientAttachments patientId={info?._id}></PatientAttachments>
      </Grid>
    </React.Fragment>
  );
}
