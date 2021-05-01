import React from "react";
import { Link as RouterLink, useParams } from "react-router-dom";
import clsx from "clsx";

import { Alergy } from "../models/patient";
import PatientHistoryGeneric from "../components/PatientHistoryGeneric";

import { makeStyles, Paper, Typography, IconButton } from "@material-ui/core";

import { Edit as EditIcon } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
  },

  fixedHeight: {
    height: 540, //240
  },
}));

type Props = {
  alergies: Alergy[];
};
export default function PatientAlergies({ alergies }: Props) {
  const { id } = useParams<{ id: string }>();

  const classes = useStyles();
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

  return (
    <div>
      <Paper className={fixedHeightPaper}>
        <Typography component="h2" variant="h6" color="primary" gutterBottom>
          Antecedentes
          <IconButton component={RouterLink} to={`/patients/${id}/edit`}>
            <EditIcon />
          </IconButton>
        </Typography>
        <PatientHistoryGeneric
          title="Alergias"
          records={alergies}
        ></PatientHistoryGeneric>
      </Paper>
    </div>
  );
}
