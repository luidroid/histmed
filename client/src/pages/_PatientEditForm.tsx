import React from "react";
import PatientForm from "../components/PatientForm";

import Grid from "@material-ui/core/Grid";

export default function _PatientEditForm() {
  return (
    <React.Fragment>
      <Grid item xs={12} md={12} lg={12}>
        <h1>Editar paciente</h1>
      </Grid>
      <Grid item xs={12} md={12} lg={12}>
        <PatientForm edit></PatientForm>
      </Grid>
    </React.Fragment>
  );
}
