import React from "react";
import Grid from "@material-ui/core/Grid";
import PatientForm from "../components/PatientForm";

export default function _PatientCreateForm() {
  return (
    <React.Fragment>
      <Grid item xs={12} md={12} lg={12}>
        <h1>Nuevo paciente</h1>
      </Grid>
      <Grid item xs={12} md={12} lg={12}>
        <PatientForm edit={false}></PatientForm>
      </Grid>
    </React.Fragment>
  );
}
