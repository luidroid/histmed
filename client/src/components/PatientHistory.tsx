import React from "react";
import { Link as RouterLink, useParams } from "react-router-dom";
import { useGlobalStyles } from "../styles/globalStyles";

import { History } from "../models/patient";
import PatientHistoryGeneric from "./PatientHistoryGeneric";

import { Paper, Typography, IconButton } from "@material-ui/core";

import { Edit as EditIcon } from "@material-ui/icons";

type Props = {
  historyList: History[];
};
export default function PatientHistory({ historyList }: Props) {
  const { id } = useParams<{ id: string }>();

  const globalClasses = useGlobalStyles();

  return (
    <Paper className={globalClasses.paper}>
      <Typography component="h2" variant="h6" color="primary" gutterBottom>
        Antecedentes
        <IconButton component={RouterLink} to={`/patients/${id}/edit`}>
          <EditIcon />
        </IconButton>
      </Typography>
      <PatientHistoryGeneric records={historyList}></PatientHistoryGeneric>
    </Paper>
  );
}
