import React from "react";
import Grid from "@material-ui/core/Grid";
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
