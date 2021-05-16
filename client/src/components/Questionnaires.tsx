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
import Link from "@material-ui/core/Link";
import List from "@material-ui/core/List";

import EditIcon from "@material-ui/icons/Edit";
import AddIcon from "@material-ui/icons/Add";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import AlertError from "./AlertError";
import Fab from "@material-ui/core/Fab";
import Collapse from "@material-ui/core/Collapse";

export default function Questionnaires() {
  const globalClasses = useGlobalStyles();
  const [open, setOpen] = React.useState(true);
  const [loading, setLoading] = useState(true);
  const [questionnaires, setQuestionnaires] = useState<Questionnaire[]>();
  const [error, setError] = useState(false);
  const [customError, setCustomError] = useState<CustomError>({
    status: "",
    message: "",
  });

  const handleClick = () => {
    setOpen(!open);
  };

  useEffect(() => {
    (async () => {
      setLoading(true);
      setError(false);
      try {
        const { data } = await axios.get(`/questionnaires`);
        console.log("🚀 ~ file: Questions.tsx ~ line 42 ~ data", data);
        setQuestionnaires(data);
      } catch (error) {
        setCustomError(error);
        setError(true);
        console.log(error);
      }
      setLoading(false);
    })();
  }, []);

  const questionnaireList = questionnaires?.map((questionnaire, index) => (
    <div key={index}>
      <ListItem dense onClick={handleClick}>
        <ListItemText
          primary={
            <Typography component="span" variant="body1" color="textPrimary">
              <strong>{`${index + 1}. `}</strong> {questionnaire.name}
            </Typography>
          }
        />
        {open ? <ExpandLessIcon /> : <ExpandMoreIcon />}
      </ListItem>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {questionnaire.questions.map((question) => (
            <ListItem button>
              <ListItemText primary={question} />
            </ListItem>
          ))}
        </List>
      </Collapse>
    </div>
  ));

  return (
    <Paper className={globalClasses.paper}>
      <Typography component="h2" variant="h6" color="primary">
        Cuestionarios
        <Fab
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
  );
}
