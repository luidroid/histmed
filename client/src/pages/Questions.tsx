import React, { useEffect, useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import axios from "../api/apiConfig";
import { useGlobalStyles } from "../styles/globalStyles";
import Loading from "../components/Loading";

import {
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
  const [loading, setLoading] = useState(true);

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
        setLoading(false);
      } catch (error) {
        if (!error.response) {
          setLoading(false);
        } else {
          setLoading(false);
        }
        console.log(error);
      }
    })();
  }, []);

  useEffect(() => {
    let content = mailSalutation;
    let result = "";
    questions.map((q, index) => {
      return (result = result.concat(`${index + 1}. ${q}%0A`));
    });
    content = content.concat(result).concat(mailSignature);
    setMailContent(content);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, [questions]);

  const questionList = questions.map((question, index) => (
    <div key={index}>
      <ListItem dense>
        <ListItemText
          primary={
            <Typography component="span" variant="body1" color="textPrimary">
              <b>{`${index + 1}. `}</b> {question}
            </Typography>
          }
        />
      </ListItem>
    </div>
  ));

  return (
    <div>
      <Paper className={globalClasses.paper}>
        <Typography component="h2" variant="h6" color="primary">
          Cuestionario
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
        {loading ? <Loading></Loading> : <List>{questionList}</List>}
      </Paper>
    </div>
  );
}
