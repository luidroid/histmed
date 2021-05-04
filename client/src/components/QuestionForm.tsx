import React, { useEffect, useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import axios from "../api/apiConfig";
import { useGlobalStyles } from "../styles/globalStyles";

import {
  Box,
  Button,
  Divider,
  FormControl,
  FormGroup,
  Grid,
  Icon,
  IconButton,
  Paper,
  TextField,
  Typography,
  FormHelperText,
  FormLabel,
} from "@material-ui/core";

import { Formik, Form, FieldArray, Field, getIn } from "formik";
import * as yup from "yup";
import { ArrowDownward, ArrowUpward, Delete } from "@material-ui/icons";

const validationSchema = yup.object({
  questions: yup.array().of(yup.string().required("Pregunta es requerida")),
});

type Question = {
  questions: string[];
};
export default function QuestionForm() {
  const classes = useGlobalStyles();
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

  const handleSubmit = (questions: any) => {
    (async () => {
      try {
        await axios.put(`/questionnaire`, questions);
      } catch (error) {
        console.log(error);
      }
    })();
  };

  return (
    <React.Fragment>
      <Paper className={classes.paper}>
        <Typography component="h2" variant="h6" color="primary" gutterBottom>
          Preguntas{" "}
        </Typography>
        <Formik
          initialValues={{ questions }}
          validationSchema={validationSchema}
          enableReinitialize
          onSubmit={(values) => {
            console.log(values);
            // handleSubmit(values);
          }}
        >
          {(formik) => (
            <Form autoComplete="off">
              <FieldArray
                name="questions"
                render={(arrayHelpers) => {
                  const len = formik.values.questions.length;
                  return (
                    <FormGroup>
                      <FormControl>
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
                                <Grid item xs={12} md={12} lg={6}>
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
                                <Grid item xs={12} md={12} lg={6}>
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
                                  <Divider></Divider>
                                </Grid>
                              </Grid>
                            </div>
                          );
                        })}
                      </FormControl>
                      <FormControl>
                        <Button
                          variant="outlined"
                          color="default"
                          size="small"
                          startIcon={<Icon>add</Icon>}
                          onClick={() => arrayHelpers.push("")}
                        >
                          Nueva pregunta{" "}
                        </Button>
                      </FormControl>
                    </FormGroup>
                  );
                }}
              />
              <Box className={classes.spacing}>
                <Button
                  color="primary"
                  variant="contained"
                  size="large"
                  type="submit"
                >
                  Guardar
                </Button>
                <Button
                  variant="contained"
                  size="large"
                  component={RouterLink}
                  to={`/questionnaire`}
                >
                  Cancelar
                </Button>
              </Box>
            </Form>
          )}
        </Formik>
      </Paper>
    </React.Fragment>
  );
}
