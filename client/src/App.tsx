import React from "react";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import DashboardLayout from "./layouts/DashboardLayout";
import _Patients from "./pages/_Patients";
import PatientDetailPage from "./pages/_PatientDetails";
import _PatientCreateForm from "./pages/_PatientCreateForm";
import _PatientEditForm from "./pages/_PatientEditForm";
//import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <DashboardLayout>
          <Switch>
            <Route path="/patients/new" component={_PatientCreateForm} />
            <Route path="/patients/:id/edit" component={_PatientEditForm} />
            <Route path="/patients/:id" component={PatientDetailPage} />
            <Route path="/" component={_Patients} />
          </Switch>
        </DashboardLayout>
      </div>
    </Router>
  );
}

export default App;
