import React, { useEffect, useState } from "react";
import { Link as RouterLink, useHistory, useParams } from "react-router-dom";
import axios from "../api/apiConfig";
import { useGlobalStyles } from "../styles/globalStyles";
import { CustomError, Questionnaire } from "../models/patient";
import Loading from "./Loading";
import { QUESTIONNAIRES_URL } from "../constants/constants";

import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListSubheader from "@material-ui/core/ListSubheader";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import IconButton from "@material-ui/core/IconButton";
import List from "@material-ui/core/List";

import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import AddIcon from "@material-ui/icons/Add";
import AlertError from "./AlertError";
import Fab from "@material-ui/core/Fab";
import { Link } from "@material-ui/core";
import { initQuestionnaire } from "../api/patientService";

export default function QuestionnaireDetails() {
  const globalClasses = useGlobalStyles();
  const history = useHistory();
  const { id } = useParams<{ id: string }>();
  const questionnarieUrl = QUESTIONNAIRES_URL.concat(`/${id}`);
  const [loading, setLoading] = useState(true);
  const [questionnaire, setQuestionnaire] =
    useState<Questionnaire>(initQuestionnaire);
  const [error, setError] = useState(false);
  const [customError, setCustomError] = useState<CustomError>({
    status: "",
    message: "",
  });

  useEffect(() => {
    (async () => {
      setLoading(true);
      setError(false);
      try {
        const { data } = await axios.get(questionnarieUrl);
        setQuestionnaire(data);
      } catch (error) {
        setCustomError(error);
        setError(true);
        console.log(error);
      }
      setLoading(false);
    })();
  }, []);

  const questions = questionnaire.questions.map((question, index) => (
    <ListItem dense key={index}>
      <ListItemText
        primary={
          <Typography component="span" variant="body1" color="textPrimary">
            <strong>{index + 1}. </strong>
            {question}
          </Typography>
        }
      />
    </ListItem>
  ));

  return (
    <Paper className={globalClasses.paper}>
      <Typography component="h2" variant="h6" color="primary">
        Vista previa
        <IconButton
          component={RouterLink}
          to={`/questionnaires/${questionnaire._id}/edit`}
        >
          <EditIcon />
        </IconButton>
        <IconButton>
          <DeleteIcon />
        </IconButton>
      </Typography>
      {error && (
        <AlertError
          status={customError.status}
          message={customError.message}
        ></AlertError>
      )}
      {loading ? (
        <Loading></Loading>
      ) : (
        <List
          subheader={
            <ListSubheader component="div" id="nested-list-subheader">
              {questionnaire.name}
            </ListSubheader>
          }
        >
          {questions}
        </List>
      )}
    </Paper>
  );
}
