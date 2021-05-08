import React from "react";
import { Grid, Typography } from "@material-ui/core";

export default function _AppointmentDetails() {
  return (
    <React.Fragment>
      <Grid item xs={12} md={12} lg={12}>
        <Typography component="h1" variant="h4">
          Detalle de la consulta
        </Typography>
      </Grid>
      <Grid item xs={12} md={12} lg={12}></Grid>
    </React.Fragment>
  );
}
