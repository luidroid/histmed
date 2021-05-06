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
  const [mailContent, setMailContent] = useState("");
  const mailSalutation = "Estimado(a)%20,%0A%0A";
  const mailSignature =
    "%0A%0ASaludos cordiales,%0A%0ADr.%20Andrés%20Amoroso%0AEspecialista%20en%20Cirugía%20Plástica,%20Estética%20y%20Reconstructiva%0Awww.doctoramoroso.com";

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

  useEffect(() => {
    let content = mailSalutation;
    let result = "";
    questions.map((q, index) => {
      result = result.concat(`${index + 1}. ${q}%0A`);
    });
    content = content.concat(result).concat(mailSignature);
    setMailContent(content);
  }, [questions]);

  const questionList = questions.map((question, index) => (
    <React.Fragment key={index}>
      <ListItem dense>
        <ListItemText
          primary={
            <Typography component="span" variant="body1" color="textPrimary">
              <b>{`${index + 1}. `}</b> {question}
            </Typography>
          }
        />
      </ListItem>
    </React.Fragment>
  ));

  return (
    <div>
      <Paper className={globalClasses.paper}>
        <Typography component="h2" variant="h6" color="primary">
          Preguntas{" "}
          <IconButton component={RouterLink} to={`/questionnaire/edit`}>
            <Edit />
          </IconButton>
          <Link href={`mailto:?subject=Cuestionario&body=${mailContent}`}>
            <IconButton>
              <Mail />
            </IconButton>
          </Link>
          <IconButton onClick={() => window.print()}>
            <Print />
          </IconButton>
        </Typography>
        <List>{questionList}</List>
      </Paper>
    </div>
  );
}
