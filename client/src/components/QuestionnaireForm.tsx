import React, { useEffect, useState } from "react";
import { useParams, useHistory, Link as RouterLink } from "react-router-dom";
import axios from "../api/apiConfig";
import { useGlobalStyles } from "../styles/globalStyles";
import Loading from "./Loading";
import AlertError from "./AlertError";

import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import Grid from "@material-ui/core/Grid";
import Icon from "@material-ui/core/Icon";
import IconButton from "@material-ui/core/IconButton";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";

import { Formik, Form, FieldArray, getIn } from "formik";
import * as yup from "yup";
import { ArrowDownward, ArrowUpward, Delete } from "@material-ui/icons";
import { initQuestionnaire } from "../api/patientService";
import { QUESTIONNAIRES_URL } from "../constants/constants";
import { FormHelperText, FormLabel } from "@material-ui/core";

const validationSchema = yup.object({
  name: yup.string().required("Nombre es requerido"),
  questions: yup.array().of(yup.string().required("Pregunta es requerida")),
});

type Props = {
  edit: boolean;
};
export default function QuestionnaireForm({ edit }: Props) {
  const globalClasses = useGlobalStyles();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const history = useHistory();
  const { id } = useParams<{ id: string }>();
  const questionnaireUrl = QUESTIONNAIRES_URL.concat(`/${id}`);
  const [questionnaire, setQuestionnaire] = useState(initQuestionnaire);

  useEffect(() => {
    setLoading(true);
    if (edit) {
      (async () => {
        try {
          const { data } = await axios.get(questionnaireUrl);
          setQuestionnaire(data);
          setLoading(false);
        } catch (error) {
          setError(true);
          setLoading(false);
          console.log(error);
        }
      })();
    } else {
      setLoading(false);
    }
  }, [edit, questionnaireUrl]);

  const handleSubmit = (questionnaire: any) => {
    let url = QUESTIONNAIRES_URL;
    if (edit) {
      url = questionnaireUrl;
      (async () => {
        try {
          await axios.put(url, questionnaire);
          history.push(QUESTIONNAIRES_URL);
        } catch (error) {
          console.log(error);
        }
      })();
    } else {
      (async () => {
        try {
          await axios.post(url, questionnaire);
          history.push(QUESTIONNAIRES_URL);
        } catch (error) {
          console.log(error);
        }
      })();
    }
  };

  return (
    <React.Fragment>
      <Formik
        initialValues={questionnaire}
        validationSchema={validationSchema}
        enableReinitialize
        onSubmit={(values) => {
          console.log(values);
          handleSubmit(values);
        }}
      >
        {(formik) => (
          <Form className={globalClasses.root} autoComplete="off">
            <Paper className={globalClasses.paper}>
              <Typography component="h2" variant="h6" color="primary">
                {edit ? "Editar" : "Nuevo"} cuestionario
              </Typography>
              {error && (
                <AlertError
                  status="No existe conexión"
                  message="Reinicie la base de datos"
                ></AlertError>
              )}
              {loading ? (
                <Loading></Loading>
              ) : (
                <FormControl component="fieldset">
                  <FormControl>
                    <TextField
                      variant="outlined"
                      id="name"
                      name="name"
                      label="Nombre del cuestionario*"
                      value={formik.values.name}
                      onChange={formik.handleChange}
                      error={formik.touched.name && Boolean(formik.errors.name)}
                      helperText={formik.touched.name && formik.errors.name}
                      className={globalClasses.textField}
                    />
                  </FormControl>

                  <FieldArray
                    name="questions"
                    render={(arrayHelpers) => {
                      const len = formik.values.questions.length;
                      return (
                        <div>
                          {formik.values.questions.map((question, index) => {
                            const questionIndex = `questions[${index}]`;
                            const touchedQuestion = getIn(
                              formik.touched,
                              questionIndex
                            );
                            const errorQuestion = getIn(
                              formik.errors,
                              questionIndex
                            );

                            const disabledArrowDownward = index === len - 1;
                            const disabledArrowUpward = index === 0;

                            return (
                              <div key={index}>
                                <Grid container spacing={1}>
                                  <Grid item xs={12} md={12} lg={8}>
                                    <TextField
                                      fullWidth
                                      variant="filled"
                                      name={questionIndex}
                                      label="Pregunta"
                                      value={question}
                                      onChange={formik.handleChange}
                                      error={Boolean(
                                        touchedQuestion && errorQuestion
                                      )}
                                      helperText={
                                        touchedQuestion && errorQuestion
                                          ? errorQuestion
                                          : ""
                                      }
                                    />
                                  </Grid>
                                  <Grid item xs={12} md={12} lg={4}>
                                    <IconButton
                                      disabled={disabledArrowDownward}
                                      onClick={() => {
                                        if (!disabledArrowDownward) {
                                          arrayHelpers.swap(index, index + 1);
                                        }
                                      }}
                                    >
                                      <ArrowDownward />
                                    </IconButton>
                                    <IconButton
                                      disabled={disabledArrowUpward}
                                      onClick={() => {
                                        if (!disabledArrowUpward) {
                                          arrayHelpers.swap(index, index - 1);
                                        }
                                      }}
                                    >
                                      <ArrowUpward />
                                    </IconButton>
                                    <IconButton
                                      onClick={() => arrayHelpers.remove(index)}
                                    >
                                      <Delete />
                                    </IconButton>
                                  </Grid>
                                </Grid>
                              </div>
                            );
                          })}
                          <FormControl className={globalClasses.spacing}>
                            <Button
                              variant="contained"
                              color="secondary"
                              size="small"
                              startIcon={<Icon>subdirectory_arrow_right</Icon>}
                              onClick={() => arrayHelpers.push("")}
                            >
                              Nueva pregunta{" "}
                            </Button>
                          </FormControl>
                        </div>
                      );
                    }}
                  />
                </FormControl>
              )}
            </Paper>

            <Box className={globalClasses.spacing}>
              <Button
                color="primary"
                variant="contained"
                size="large"
                type="submit"
                disabled={formik.isSubmitting}
              >
                Guardar
              </Button>
              <Button
                variant="outlined"
                size="large"
                component={RouterLink}
                to={`/questionnaires`}
                disabled={formik.isSubmitting}
              >
                Cancelar
              </Button>
            </Box>
          </Form>
        )}
      </Formik>
    </React.Fragment>
  );
}
