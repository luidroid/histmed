import React from "react";
import { Link as RouterLink, useParams } from "react-router-dom";
import { useGlobalStyles } from "../styles/globalStyles";

import { History } from "../models/patient";
import PatientHistoryGeneric from "./PatientHistoryGeneric";

import { Paper, Typography, IconButton } from "@material-ui/core";

import { Edit as EditIcon } from "@material-ui/icons";
import { PATIENTS_URL } from "../constants/constants";

type Props = {
  historyList: History[];
};
export default function PatientHistory({ historyList }: Props) {
  const globalClasses = useGlobalStyles();
  const { id } = useParams<{ id: string }>();
  const patientUrl = `${PATIENTS_URL}/${id}`;

  return (
    <Paper className={globalClasses.paper}>
      <Typography component="h2" variant="h6" color="primary" gutterBottom>
        Antecedentes
        <IconButton component={RouterLink} to={`${patientUrl}/edit`}>
          <EditIcon />
        </IconButton>
      </Typography>
      <PatientHistoryGeneric records={historyList}></PatientHistoryGeneric>
    </Paper>
  );
}
