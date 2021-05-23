import React, { useEffect, useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import axios from "../api/apiConfig";
import { useGlobalStyles } from "../styles/globalStyles";
import { CustomError, Questionnaire } from "../models/patient";
import Loading from "./Loading";
import { initCustomError, initQuestionnaire } from "../api/patientService";
import CustomAlertError from "./CustomAlertError";

import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import IconButton from "@material-ui/core/IconButton";
import List from "@material-ui/core/List";

import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import AddIcon from "@material-ui/icons/Add";
import Fab from "@material-ui/core/Fab";
import { Box, Link } from "@material-ui/core";

import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

export default function Questionnaires() {
  const globalClasses = useGlobalStyles();

  const [loading, setLoading] = useState(true);
  const [questionnaires, setQuestionnaires] = useState<Questionnaire[]>([]);
  const [questionnaire, setQuestionnaire] = useState<Questionnaire>(
    initQuestionnaire
  );
  const [error, setError] = useState(false);
  const [customError, setCustomError] = useState<CustomError>(initCustomError);

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = (q: Questionnaire) => {
    setQuestionnaire(q);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = () => {
    handleDeleteQuestionnaire();
    setOpen(false);
  };

  /** Delete questionnaire */
  const handleDeleteQuestionnaire = () => {
    (async () => {
      setError(false);
      try {
        await axios.delete(`/questionnaires/${questionnaire._id}`);
        const results = questionnaires.filter(
          (q) => q._id !== questionnaire._id
        );
        setQuestionnaires(results);
      } catch (error) {
        setCustomError(error);
        setError(true);
        console.log(error);
      }
    })();
  };

  useEffect(() => {
    (async () => {
      setLoading(true);
      setError(false);
      try {
        const { data } = await axios.get(`/questionnaires`);
        setQuestionnaires(data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        setCustomError(error);
        setError(true);
        console.log(error);
      }
    })();
  }, []);

  const questionnaireList = questionnaires?.map((questionnaire, index) => (
    <div key={index}>
      <Box>
        <Link
          variant="subtitle1"
          color="secondary"
          component={RouterLink}
          to={`/questionnaires/${questionnaire._id}`}
        >
          {questionnaire.name}
        </Link>

        <IconButton
          component={RouterLink}
          to={`/questionnaires/${questionnaire._id}/edit`}
        >
          <EditIcon />
        </IconButton>

        <IconButton onClick={() => handleClickOpen(questionnaire)}>
          <DeleteIcon />
        </IconButton>
      </Box>
      {questionList(questionnaire)}
    </div>
  ));

  function questionList(questionnaire: Questionnaire) {
    return (
      <List>
        {questionnaire.questions.map((question, index) => (
          <ListItem dense key={index}>
            <ListItemText
              primary={
                <Typography
                  component="span"
                  variant="body1"
                  color="textPrimary"
                >
                  <strong>{index + 1}. </strong>
                  {question}
                </Typography>
              }
            />
          </ListItem>
        ))}
      </List>
    );
  }

  const deleteDialog = (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        {"Desea eliminar esta consulta?"}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          La consulta <strong>"{questionnaire.name}"</strong> será eliminada
          definitivamente del sistema.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancelar
        </Button>
        <Button onClick={handleDelete} color="primary" autoFocus>
          Eliminar
        </Button>
      </DialogActions>
    </Dialog>
  );

  return (
    <Paper className={globalClasses.paper}>
      <Typography component="h2" variant="h6" color="primary">
        Cuestionarios
        <Fab
          className={globalClasses.fab}
          color="primary"
          aria-label="add"
          size="medium"
          component={RouterLink}
          to={`/questionnaires/new`}
        >
          <AddIcon />
        </Fab>
      </Typography>
      {error && (
        <CustomAlertError
          status={customError.status}
          message={customError.message}
        ></CustomAlertError>
      )}
      {loading ? <Loading></Loading> : <List>{questionnaireList}</List>}
      {deleteDialog}
    </Paper>
  );
}
