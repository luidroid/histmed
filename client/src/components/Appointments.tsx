import React, { useEffect, useState } from "react";
import axios from "../api/apiConfig";
import { useGlobalStyles } from "../styles/globalStyles";

import { Appointment } from "../models/patient";
import Grid from "@material-ui/core/Grid";
import {
  CircularProgress,
  Divider,
  Paper,
  Typography,
} from "@material-ui/core";
import AppointmentItem from "./AppointmentItem";

import {
  DataGrid,
  GridColDef,
  GridValueGetterParams,
} from "@material-ui/data-grid";
import { Alert } from "@material-ui/lab";

const columns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 70 },
  { field: "firstName", headerName: "First name", width: 130 },
  { field: "lastName", headerName: "Last name", width: 130 },
  {
    field: "age",
    headerName: "Age",
    type: "number",
    width: 90,
  },
  {
    field: "fullName",
    headerName: "Full name",
    description: "This column has a value getter and is not sortable.",
    sortable: false,
    width: 160,
    valueGetter: (params: GridValueGetterParams) =>
      `${params.getValue("firstName") || ""} ${
        params.getValue("lastName") || ""
      }`,
  },
];

const rows = [
  { id: 1, lastName: "Snow", firstName: "Jon", age: 35 },
  { id: 2, lastName: "Lannister", firstName: "Cersei", age: 42 },
  { id: 3, lastName: "Lannister", firstName: "Jaime", age: 45 },
  { id: 4, lastName: "Stark", firstName: "Arya", age: 16 },
  { id: 5, lastName: "Targaryen", firstName: "Daenerys", age: null },
  { id: 6, lastName: "Melisandre", firstName: null, age: 150 },
  { id: 7, lastName: "Clifford", firstName: "Ferrara", age: 44 },
  { id: 8, lastName: "Frances", firstName: "Rossini", age: 36 },
  { id: 9, lastName: "Roxie", firstName: "Harvey", age: 65 },
];

type Props = {
  appointments: Appointment[];
};
export default function Appointments() {
  const globalClasses = useGlobalStyles();

  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get(`/appointments`);
        console.log("🚀 ~ file: Appointments.tsx ~ line 19 ~ data", data);
        setAppointments(data);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setError(true);
        setLoading(false);
      }
    })();
  }, []);

  return (
    <React.Fragment>
      {loading ? (
        <Grid container spacing={1} justify="center">
          <CircularProgress />
        </Grid>
      ) : error ? (
        <Alert severity="error">Ocurrió un error</Alert>
      ) : (
        <Grid container spacing={1}>
          <Grid item xs={12} md={12} lg={12}>
            <Paper className={globalClasses.paper}>
              <div style={{ height: 400, width: "100%" }}>
                <DataGrid
                  rows={rows}
                  columns={columns}
                  pageSize={5}
                  checkboxSelection
                />
              </div>
            </Paper>
          </Grid>
          <Grid item xs={12} md={12} lg={12}>
            {appointments.map((appointment) => (
              <AppointmentItem appointment={appointment}></AppointmentItem>
            ))}
          </Grid>
        </Grid>
      )}
    </React.Fragment>
  );
}
