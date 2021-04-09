import React from "react";
import Grid from "@material-ui/core/Grid";

import PatientDetails from "../components/PatientDetails";

export default function AppointmentsPage() {
  return (
    <React.Fragment>
      <Grid item xs={6} md={6} lg={6}>
        <h1>Pacientes</h1>
      </Grid>

      <PatientDetails></PatientDetails>
    </React.Fragment>
  );
}
