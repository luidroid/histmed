import React from "react";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import DashboardLayout from "./layouts/DashboardLayout";
import PatientsPage from "./pages/PatientsPage";
import PatientDetailPage from "./pages/PatientDetailPage";
import AppointmentsPage from "./pages/AppointmentsPage";
//import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <DashboardLayout>
          <Switch>
            <Route path="/appointments" component={AppointmentsPage} />
            <Route path="/patients/:id" component={PatientDetailPage} />
            <Route path="/" component={PatientsPage} />
          </Switch>
        </DashboardLayout>
      </div>
    </Router>
  );
}

export default App;
