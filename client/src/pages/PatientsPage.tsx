import React from "react";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";

import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";
import Patients from "../components/Patients";
import { Link } from "react-router-dom";

const useStyles = makeStyles(() => ({
  newPatientButton: {
    marginTop: 15,
  },
}));

export default function PatientsPage() {
  const classes = useStyles();

  return (
    <React.Fragment>
      <Grid item xs={6} md={6} lg={6}>
        <h1>Pacientes</h1>
      </Grid>

      <Grid item xs={6} md={6} lg={6}>
        <Grid container direction="row" justify="flex-end">
          <Button
            variant="contained"
            color="primary"
            startIcon={<AddIcon />}
            size="large"
            className={classes.newPatientButton}
            component={Link}
            to={"/patients/new"}
          >
            Paciente
          </Button>
        </Grid>
      </Grid>

      <Patients></Patients>
    </React.Fragment>
  );
}
