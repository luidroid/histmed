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
import MailIcon from "@material-ui/icons/Mail";
import PrintIcon from "@material-ui/icons/Print";
import AlertError from "./AlertError";
import { Link } from "@material-ui/core";
import { initQuestionnaire } from "../api/patientService";

import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

export default function QuestionnaireDetails() {
  const globalClasses = useGlobalStyles();
  const history = useHistory();
  const { id } = useParams<{ id: string }>();
  const questionnaireUrl = QUESTIONNAIRES_URL.concat(`/${id}`);
  const [loading, setLoading] = useState(true);
  const [questionnaire, setQuestionnaire] = useState<Questionnaire>(
    initQuestionnaire
  );
  const [error, setError] = useState(false);
  const [customError, setCustomError] = useState<CustomError>({
    status: "",
    message: "",
  });
  const [mailContent, setMailContent] = useState("");
  const subject = "Cuestionario";
  const mailSalutation = "Estimado(a)%20,%0A%0A";
  const mailSignature =
    "%0A%0ASaludos cordiales,%0A%0ADr.%20Andrés%20Amoroso%0AEspecialista%20en%20Cirugía%20Plástica,%20Estética%20y%20Reconstructiva%0Awww.doctoramoroso.com";

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
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
        await axios.delete(`${QUESTIONNAIRES_URL}/${questionnaire._id}`);
        history.push(QUESTIONNAIRES_URL);
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
        const { data } = await axios.get(questionnaireUrl);
        setQuestionnaire(data);
      } catch (error) {
        setCustomError(error);
        setError(true);
        console.log(error);
      }
      setLoading(false);
    })();
  }, [questionnaireUrl]);

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

  useEffect(() => {
    let content = mailSalutation;

    let result = "";
    questionnaire.questions.map((q, index) => {
      return (result = result.concat(`${index + 1}. ${q}%0A`));
    });
    content = content.concat(result).concat(mailSignature);
    setMailContent(content);
  }, [questionnaire]);

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
        Vista previa
        <IconButton onClick={() => window.print()}>
          <PrintIcon />
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
              <Typography component="h1" variant="subtitle1" color="secondary">
                {questionnaire.name}
                <IconButton
                  component={RouterLink}
                  to={`${QUESTIONNAIRES_URL}/${questionnaire._id}/edit`}
                >
                  <EditIcon />
                </IconButton>
                <IconButton onClick={handleClickOpen}>
                  <DeleteIcon />
                </IconButton>
                <Link href={`mailto:?subject=${subject}&body=${mailContent}`}>
                  <IconButton>
                    <MailIcon />
                  </IconButton>
                </Link>
              </Typography>
            </ListSubheader>
          }
        >
          {questions}
        </List>
      )}
      {deleteDialog}
    </Paper>
  );
}
