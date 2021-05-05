import React, { useEffect, useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import axios from "../api/apiConfig";
import { useGlobalStyles } from "../styles/globalStyles";

import {
  Divider,
  IconButton,
  Link,
  List,
  ListItem,
  ListItemText,
  Paper,
  Typography,
} from "@material-ui/core";
import { Edit, Mail, Print } from "@material-ui/icons";

export default function Questions() {
  const globalClasses = useGlobalStyles();
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
    <div>
      <Paper className={globalClasses.paper}>
        <Typography component="h2" variant="h6" color="primary" gutterBottom>
          Preguntas{" "}
          <IconButton component={RouterLink} to={`/questionnaire/edit`}>
            <Edit />
          </IconButton>
          <Link href={`mailto:`}>
            <IconButton>
              <Mail />
            </IconButton>
          </Link>
          <IconButton onClick={() => window.print()}>
            <Print />
          </IconButton>
          <List>{questionList}</List>
        </Typography>
      </Paper>
    </div>
  );
}
