import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "../api/apiConfig";
import { initCustomError } from "../api/patientService";
import Loading from "./Loading";
import CustomAlertError from "./CustomAlertError";

import { Patient, CustomError, Appointment } from "../models/patient";
import { initPatient } from "../api/patientService";
import PatientInfo from "../components/PatientInfo";

import { Grid } from "@material-ui/core/";

import PatientHistory from "./PatientHistory";
import PatientAppointments from "./PatientAppointments";
import PatientAttachments from "./PatientAttachments";
import { PATIENTS_URL, APPOINTMENTS_URL } from "../constants/constants";

export default function PatientDetails() {
  const { id } = useParams<{ id: string }>();
  const patientUrl = `${PATIENTS_URL}/${id}`;
  const appointmentsUrl = `${APPOINTMENTS_URL}/${id}/patient`;
  const [patient, setPatient] = useState<Patient>(initPatient);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [customError, setCustomError] = useState<CustomError>(initCustomError);

  useEffect(() => {
    (async () => {
      setLoading(true);
      setError(false);
      try {
        const { data } = await axios.get<Patient>(patientUrl);
        setPatient(data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        setCustomError(error);
        setError(true);
        console.log(error);
      }
    })();
  }, [id, patientUrl]);

  useEffect(() => {
    (async () => {
      setLoading(true);
      setError(false);
      try {
        const { data } = await axios.get<Appointment[]>(appointmentsUrl);
        setAppointments(data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        setCustomError(error);
        setError(true);
        console.log(error);
      }
    })();
  }, [id]);

  return (
    <React.Fragment>
      {error && (
        <CustomAlertError
          status={customError.status}
          message={customError.message}
        ></CustomAlertError>
      )}
      {loading ? (
        <Loading></Loading>
      ) : (
        <Grid item xs={12} md={8} lg={8}>
          <PatientInfo {...patient}></PatientInfo>
          <PatientHistory historyList={patient.historyList}></PatientHistory>
        </Grid>
      )}

      <Grid item xs={12} md={4} lg={4}>
        <PatientAppointments
          appointments={patient.appointments}
        ></PatientAppointments>{" "}
        <PatientAttachments patientId={patient?._id}></PatientAttachments>
      </Grid>
    </React.Fragment>
  );
}
