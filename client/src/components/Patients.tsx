import React, { useState, useEffect } from "react";
import axios from "../api/apiConfig";

import Grid from "@material-ui/core/Grid";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";

import Paper from "@material-ui/core/Paper";
import InputBase from "@material-ui/core/InputBase";
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from "@material-ui/icons/Search";

import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

import PatientCard from "../components/PatientCard";
import { Patient } from "../models/patient";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: "2px 4px",
      display: "flex",
      alignItems: "center",
    },
    input: {
      marginLeft: theme.spacing(1),
      flex: 1,
    },
    iconButton: {
      padding: 10,
    },
    divider: {
      height: 28,
      margin: 4,
    },
    formControl: {
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  })
);

export default function Patients() {
  const classes = useStyles();
  const [patients, setPatients] = useState<Patient[]>([]);
  const [filteredPatients, setFilteredPatients] = useState<Patient[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("nameAsc");

  /** Get patients */
  const getPatients = async () => {
    try {
      const { data } = await axios.get<Patient[]>("/patients");
      setPatients(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getPatients();
  }, []);

  /** Filter patients */
  const handleSearch = (event: React.ChangeEvent<{ value: unknown }>) => {
    setSearchTerm(event.target.value as string);
  };

  const handleSortBy = (event: React.ChangeEvent<{ value: unknown }>) => {
    setSortBy(event.target.value as string);
  };

  useEffect(() => {
    const results = patients.filter((patient) => {
      const firtname = patient.firstname.toLowerCase();
      const lastname = patient.lastname.toLowerCase();
      const name = firtname.concat(lastname);
      return name.includes(searchTerm.trim().toLowerCase());
    });

    switch (sortBy) {
      case "nameDesc":
        results.sort(sortByNameDesc);
        break;
      case "dateAsc":
        results.sort(sortByDateAsc);
        break;
      case "dateDesc":
        results.sort(sortByDateDesc);
        break;

      default:
        results.sort(sortByNameAsc);
        break;
    }

    setFilteredPatients(results);
  }, [searchTerm, sortBy, patients]);

  function sortByNameAsc(p1: Patient, p2: Patient) {
    return p1.firstname.localeCompare(p2.firstname);
  }

  function sortByNameDesc(p1: Patient, p2: Patient) {
    return p1.firstname.localeCompare(p2.firstname) * -1;
  }

  function sortByDateAsc(p1: Patient, p2: Patient) {
    const d1 = new Date(p1.lastModified).getTime();
    const d2 = new Date(p2.lastModified).getTime();
    return d1 - d2;
  }

  function sortByDateDesc(p1: Patient, p2: Patient) {
    const d1 = new Date(p1.lastModified).getTime();
    const d2 = new Date(p2.lastModified).getTime();
    return (d1 - d2) * -1;
  }

  /** Delete patient */
  const handlePatientDelete = (patientId: number) => {
    (async () => {
      try {
        await axios.delete(`/patients/${patientId}`);
        const results = patients.filter((patient) => patient.id !== patientId);
        setPatients(results);
      } catch (error) {
        console.log(error);
      }
    })();
  };

  return (
    <React.Fragment>
      <Grid item xs={12} md={6} lg={9}>
        <Paper elevation={3} component="form" className={classes.root}>
          <InputBase
            className={classes.input}
            placeholder="Búsqueda por nombre"
            inputProps={{ "aria-label": "búsqueda" }}
            value={searchTerm}
            onChange={handleSearch}
          />
          <IconButton
            type="submit"
            className={classes.iconButton}
            aria-label="search"
          >
            <SearchIcon />
          </IconButton>
        </Paper>
      </Grid>

      <Grid item xs={12} md={6} lg={3}>
        <Grid container direction="row" justify="flex-end">
          <FormControl className={classes.formControl}>
            <InputLabel id="demo-simple-select-label">Sortear por</InputLabel>
            <Select
              native
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={sortBy}
              onChange={handleSortBy}
            >
              <option value={"nameAsc"}>Nombre A-Z</option>
              <option value={"nameDesc"}>Nombre Z-A</option>
              <option value={"dateAsc"}>Fecha asc</option>
              <option value={"dateDesc"}>Ultima modificación</option>
            </Select>
          </FormControl>
        </Grid>
      </Grid>

      {filteredPatients.map((patient) => (
        <Grid item xs={12} md={4} lg={3} key={patient.id}>
          <PatientCard
            patient={patient}
            onPatientDelete={handlePatientDelete}
          ></PatientCard>
        </Grid>
      ))}
    </React.Fragment>
  );
}
