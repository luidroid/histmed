import React from "react";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
  },
  fixedHeight: {
    height: 240,
  },
}));

export function Patient() {
  const classes = useStyles();

  return (
    <div>
      <Grid container spacing={3}>
        {/* Pacientes */}
        <Grid item xs={12}>
          <Paper className={classes.paper}>Pacientes</Paper>
        </Grid>
      </Grid>
    </div>
  );
}
