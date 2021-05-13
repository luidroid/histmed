import React, { useEffect, useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import axios from "../api/apiConfig";
import { useGlobalStyles } from "../styles/globalStyles";
import Loading from "./Loading";

import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import IconButton from "@material-ui/core/IconButton";
import Link from "@material-ui/core/Link";
import List from "@material-ui/core/List";

import EditIcon from "@material-ui/icons/Edit";
import MailIcon from "@material-ui/icons/Mail";
import PrintIcon from "@material-ui/icons/Print";
import { CustomError } from "../models/patient";
import AlertError from "./AlertError";

export interface Questionnarie {
  _id: string;
  questions: string[];
}

export default function Questions() {
  const globalClasses = useGlobalStyles();
  const [loading, setLoading] = useState(true);
  const [questionnarie, setQuestionnarie] = useState<Questionnarie>();
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

  useEffect(() => {
    (async () => {
      setLoading(true);
      setError(false);
      try {
        const { data } = await axios.get(`/questionnaire`);
        console.log("🚀 ~ file: Questions.tsx ~ line 42 ~ data", data);
        setQuestionnarie(data[0]);
      } catch (error) {
        setCustomError(error);
        setError(true);
        console.log(error);
      }
      setLoading(false);
    })();
  }, []);

  useEffect(() => {
    let content = mailSalutation;

    let result = "";
    questionnarie?.questions.map((q, index) => {
      return (result = result.concat(`${index + 1}. ${q}%0A`));
    });
    content = content.concat(result).concat(mailSignature);
    setMailContent(content);
    setLoading(false);
  }, [questionnarie]);

  const questionList = questionnarie?.questions.map((question, index) => (
    <ListItem dense key={index}>
      <ListItemText
        primary={
          <Typography component="span" variant="body1" color="textPrimary">
            <strong>{`${index + 1}. `}</strong> {question}
          </Typography>
        }
      />
    </ListItem>
  ));

  return (
    <Paper className={globalClasses.paper}>
      <Typography component="h2" variant="h6" color="primary">
        Cuestionario
        <IconButton
          component={RouterLink}
          to={`/questionnaire/${questionnarie?._id}/edit`}
        >
          <EditIcon />
        </IconButton>
        <Link href={`mailto:?subject=${subject}&body=${mailContent}`}>
          <IconButton>
            <MailIcon />
          </IconButton>
        </Link>
        <IconButton onClick={() => window.print()}>
          <PrintIcon />
        </IconButton>
      </Typography>
      {error && (
        <AlertError
          message={customError.message}
          recommendation=""
        ></AlertError>
      )}
      {loading ? <Loading></Loading> : <List>{questionList}</List>}
    </Paper>
  );
}
