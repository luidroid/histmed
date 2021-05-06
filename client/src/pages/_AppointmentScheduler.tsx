import { Grid, Typography } from "@material-ui/core";
import React from "react";
import AppointmentScheduler from "../components/AppointmentScheduler";

export default function _AppointmentScheduler() {
  return (
    <React.Fragment>
      <Grid item xs={12} md={12} lg={12}>
        <Typography component="h1" variant="h4">
          Agenda{" "}
        </Typography>
      </Grid>
      <Grid item xs={12} md={12} lg={12}>
        <AppointmentScheduler></AppointmentScheduler>
      </Grid>
    </React.Fragment>
  );
}
