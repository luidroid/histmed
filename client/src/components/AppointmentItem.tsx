import React from "react";
import Grid from "@material-ui/core/Grid";
import { Appointment } from "../models/patient";
import { Divider, Paper } from "@material-ui/core";

type Props = {
  appointment: Appointment;
};
export default function AppointmentItem({ appointment }: Props) {
  return (
    <React.Fragment>
      <Paper>
        <Grid container spacing={1}>
          <Grid item xs={12} md={12} lg={2}>
            {appointment.type}
          </Grid>
          <Grid item xs={12} md={12} lg={2}>
            {appointment.createdAt}
          </Grid>
          <Grid item xs={12} md={12} lg={2}>
            {appointment.title}
          </Grid>
          <Grid item xs={12} md={12} lg={2}>
            {appointment.pattientId}
          </Grid>
          <Grid item xs={12} md={12} lg={2}>
            Actions
          </Grid>
          <Grid item xs={12} md={12} lg={12}>
            <Divider></Divider>
          </Grid>
        </Grid>
      </Paper>
    </React.Fragment>
  );
}
