import React from "react";
import Grid from "@material-ui/core/Grid";

import Button from "@material-ui/core/Button";
import Patients from "../components/Patients";
import { Link as RouterLink } from "react-router-dom";
import { Typography } from "@material-ui/core";

export default function _Patients() {
  return (
    <React.Fragment>
      <Grid item xs={6} md={6} lg={6}>
        <Typography component="h1" variant="h4">
          Pacientes
        </Typography>
      </Grid>

      <Grid item xs={6} md={6} lg={6}>
        <Grid container direction="row" justify="flex-end">
          <Button
            variant="contained"
            color="primary"
            size="large"
            component={RouterLink}
            to={"/patients/new"}
          >
            Nuevo paciente
          </Button>
        </Grid>
      </Grid>

      <Patients></Patients>
    </React.Fragment>
  );
}
