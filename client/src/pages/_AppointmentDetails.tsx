import React from "react";
import { Grid, Typography } from "@material-ui/core";
import AppointmentDetails from "../components/AppointmentDetails";

export default function _AppointmentDetails() {
  return (
    <React.Fragment>
      <Grid item xs={12} md={12} lg={12}>
        <AppointmentDetails></AppointmentDetails>
      </Grid>
    </React.Fragment>
  );
}
