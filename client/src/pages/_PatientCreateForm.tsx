import React from "react";
import Grid from "@material-ui/core/Grid";
import PatientForm from "../components/PatientForm";
import { Typography } from "@material-ui/core";

export default function _PatientCreateForm() {
  return (
    <React.Fragment>
      <Grid item xs={12} md={12} lg={12}>
        <Typography component="h1" variant="h4">
          Nuevo paciente
        </Typography>
      </Grid>
      <Grid item xs={12} md={12} lg={12}>
        <PatientForm edit={false}></PatientForm>
      </Grid>
    </React.Fragment>
  );
}
