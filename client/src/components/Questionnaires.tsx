import React, { useEffect, useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import axios from "../api/apiConfig";
import { useGlobalStyles } from "../styles/globalStyles";
import { CustomError, Questionnaire } from "../models/patient";
import Loading from "./Loading";

import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import IconButton from "@material-ui/core/IconButton";
import List from "@material-ui/core/List";

import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import AddIcon from "@material-ui/icons/Add";
import AlertError from "./AlertError";
import Fab from "@material-ui/core/Fab";
import { Box, Link } from "@material-ui/core";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";

import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";
import { initQuestionnaire } from "../api/patientService";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    fab: {
      margin: " 0 16px",
    },
    inline: {
      display: "inline",
    },
  })
);

export default function Questionnaires() {
  const globalClasses = useGlobalStyles();
  const classes = useStyles();

  const [loading, setLoading] = useState(true);
  const [questionnaires, setQuestionnaires] = useState<Questionnaire[]>([]);
  const [questionnaire, setQuestionnaire] =
    useState<Questionnaire>(initQuestionnaire);
  const [error, setError] = useState(false);
  const [customError, setCustomError] = useState<CustomError>({
    status: "",
    message: "",
  });

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = (q: Questionnaire) => {
    setQuestionnaire(q);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setQuestionnaire(initQuestionnaire);
  };

  const handleDelete = () => {
    handleDeleteQuestionnaire();
    setQuestionnaire(initQuestionnaire);
    setOpen(false);
  };

  /** Delete questionnaire */
  const handleDeleteQuestionnaire = () => {
    (async () => {
      try {
        await axios.delete(`/questionnaires/${questionnaire._id}`);
        const results = questionnaires.filter(
          (q) => q._id !== questionnaire._id
        );
        setQuestionnaires(results);
      } catch (error) {
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
      <List className={classes.inline}>
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

  return (
    <div>
      <Paper className={globalClasses.paper}>
        <Typography component="h2" variant="h6" color="primary">
          Cuestionarios
          <Fab
            className={classes.fab}
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
          <AlertError
            status={customError.status}
            message={customError.message}
          ></AlertError>
        )}
        {loading ? <Loading></Loading> : <List>{questionnaireList}</List>}
      </Paper>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Eliminar cuestionario</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            ` Desea eliminar el cuestionario {questionnaire}? `{" "}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancelar
          </Button>
          <Button onClick={handleDelete} color="primary" autoFocus>
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
