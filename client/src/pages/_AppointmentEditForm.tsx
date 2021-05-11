import React from "react";
import Grid from "@material-ui/core/Grid";
import AppointmentForm from "../components/AppointmentForm";

export default function _AppointmentEditForm() {
  return (
    <React.Fragment>
      <Grid item xs={12} md={12} lg={12}>
        <AppointmentForm edit></AppointmentForm>
      </Grid>
    </React.Fragment>
  );
}
