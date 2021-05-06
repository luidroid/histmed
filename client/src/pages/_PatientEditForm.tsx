import React from "react";
import PatientForm from "../components/PatientForm";

import Grid from "@material-ui/core/Grid";
import { Typography } from "@material-ui/core";

export default function _PatientEditForm() {
  return (
    <React.Fragment>
      <Grid item xs={12} md={12} lg={12}>
        <Typography component="h1" variant="h4">
          Editar paciente
        </Typography>
      </Grid>
      <Grid item xs={12} md={12} lg={12}>
        <PatientForm edit></PatientForm>
      </Grid>
    </React.Fragment>
  );
}
