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
import { Delete } from "@material-ui/icons";

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

  const ErrorMessage = ({ name }: any) => (
    <Field
      name={name}
      render={({ form }: any) => {
        const error = getIn(form.errors, name);
        const touch = getIn(form.touched, name);
        return touch && error ? error : null;
      }}
    />
  );

  return (
    <React.Fragment>
      <Paper className={classes.paper}>
        <Typography component="h2" variant="h6" color="primary" gutterBottom>
          Preguntas{" "}
        </Typography>
        <Formik
          initialValues={{ questions: ["uno", "dos"] }}
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
                render={(arrayHelpers) => (
                  <FormGroup>
                    <FormControl>
                      {formik.values.questions.map((question, index) => (
                        <div key={index}>
                          <TextField
                            variant="filled"
                            name={`questions.${index}`}
                            label="Pregunta"
                            value={question}
                            onChange={formik.handleChange}
                          />
                          <ErrorMessage name={`questions[${index}]`} />

                          <IconButton
                            onClick={() => arrayHelpers.remove(index)}
                          >
                            <Delete />
                          </IconButton>
                          <Divider></Divider>
                        </div>
                      ))}
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
                    <FormControl>
                      <Button
                        variant="outlined"
                        color="default"
                        size="small"
                        startIcon={<Icon>add</Icon>}
                        onClick={() => arrayHelpers.swap(0, 1)}
                      >
                        Swap{" "}
                      </Button>
                    </FormControl>
                  </FormGroup>
                )}
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
                  to={`/questions`}
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
