import React, { useEffect, useState } from "react";
import { useParams, Link as RouterLink } from "react-router-dom";

import axios from "../api/apiConfig";
import { useGlobalStyles } from "../styles/globalStyles";
import MaterialTable from "material-table";

import { Appointment } from "../models/patient";
import Grid from "@material-ui/core/Grid";
import {
  Button,
  CircularProgress,
  Divider,
  Link,
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
      <Grid container spacing={1}>
        <Grid item xs={12} md={12} lg={12}>
          <MaterialTable
            columns={[
              { title: "Fecha", field: "createdAt" },
              {
                title: "Paciente",
                field: "patientId",
                render: (rowData) => (
                  <Typography>
                    <RouterLink to={`/patients/${rowData.patientId}`}>
                      {rowData.patientId}
                    </RouterLink>
                  </Typography>
                ),
              },
              { title: "Tipo", field: "type" },
              { title: "Motivo", field: "title" },
              {
                title: "Actions",
                field: "patientId",
                render: (rowData) => (
                  <Button
                    variant="contained"
                    color="primary"
                    size="small"
                    component={RouterLink}
                    to={`/patients/${rowData.patientId}/appointments/new`}
                  >
                    Iniciar consulta{" "}
                  </Button>
                ),
              },
            ]}
            isLoading={loading}
            data={appointments}
            title="Demo Title"
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
