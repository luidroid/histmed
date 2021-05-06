import { Grid, Typography } from "@material-ui/core";
import React from "react";
import PatientScheduler from "../components/PatientScheduler";

export default function _PatientScheduler() {
  return (
    <React.Fragment>
      <Grid item xs={12} md={12} lg={12}>
        <Typography component="h1" variant="h4">
          Calendario{" "}
        </Typography>
      </Grid>
      <Grid item xs={12} md={12} lg={12}>
        <PatientScheduler></PatientScheduler>
      </Grid>
    </React.Fragment>
  );
}
