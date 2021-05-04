import React, { useEffect, useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import axios from "../api/apiConfig";

import {
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemText,
  makeStyles,
  Paper,
  Typography,
} from "@material-ui/core";
import { Edit, Print, Share } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
  },
}));

export default function Questions() {
  const classes = useStyles();
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get(`/questionnaire`);
        setQuestions(data.questions);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  const questionList = questions.map((question, index) => (
    <React.Fragment key={index}>
      <ListItem>
        <ListItemText
          primary={
            <Typography component="span" variant="body1" color="textPrimary">
              <b>{`${index + 1}. `}</b> {question}
            </Typography>
          }
        />
      </ListItem>
      <Divider></Divider>
    </React.Fragment>
  ));

  return (
    <Paper className={classes.paper}>
      <Typography component="h2" variant="h6" color="primary" gutterBottom>
        Preguntas{" "}
        <IconButton component={RouterLink} to={`/questionnaire/edit`}>
          <Edit />
        </IconButton>
        <IconButton onClick={() => window.print()}>
          <Print />
        </IconButton>
        <IconButton>
          <Share />
        </IconButton>
        <List>{questionList}</List>
      </Typography>
    </Paper>
  );
}
