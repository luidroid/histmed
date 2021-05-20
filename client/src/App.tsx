import React from "react";
import {
  Route,
  BrowserRouter as Router,
  Switch,
  Redirect,
} from "react-router-dom";
import DashboardLayout from "./layouts/DashboardLayout";
import _Patients from "./pages/_Patients";
import PatientDetailPage from "./pages/_PatientDetails";
import _PatientCreateForm from "./pages/_PatientCreateForm";
import _PatientEditForm from "./pages/_PatientEditForm";
import _PageNotFound from "./pages/_PageNotFound";
import _Questionnaires from "./pages/_Questionnaires";
import _QuestionnaireCreateForm from "./pages/_QuestionnaireCreateForm";
import _QuestionnaireEditForm from "./pages/_QuestionnaireEditForm";
import _AppointmentScheduler from "./pages/_AppointmentScheduler";
import _AppointmentCreateForm from "./pages/_AppointmentCreateForm";
import _AppointmentEditForm from "./pages/_AppointmentEditForm";
import _Appointments from "./pages/_Appointments";
import _AppointmentDetails from "./pages/_AppointmentDetails";
import _QuestionnaireDetails from "./pages/_QuestionnaireDetails";
//import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <DashboardLayout>
          <Switch>
            <Route exact path="/">
              <Redirect to="/patients" />
            </Route>
            <Route
              path="/patients/:id/appointments/new"
              component={_AppointmentCreateForm}
            />
            <Route
              path="/patients/:id/appointments/:id/edit"
              component={_AppointmentEditForm}
            />
            <Route path="/patients/new" component={_PatientCreateForm} />
            <Route path="/patients/:id/edit" component={_PatientEditForm} />
            <Route path="/patients/:id" component={PatientDetailPage} />
            <Route path="/patients" component={_Patients} />
            <Route
              path="/appointments/:id/edit"
              component={_AppointmentEditForm}
            />
            <Route path="/appointments/:id" component={_AppointmentDetails} />
            <Route path="/appointments" component={_Appointments} />
            <Route path="/scheduler" component={_AppointmentScheduler} />
            <Route
              path="/questionnaires/new"
              component={_QuestionnaireCreateForm}
            />
            <Route
              path="/questionnaires/:id/edit"
              component={_QuestionnaireEditForm}
            />
            <Route
              path="/questionnaires/:id"
              component={_QuestionnaireDetails}
            />
            <Route path="/questionnaires" component={_Questionnaires} />
            <Route path="*" component={_PageNotFound} />
          </Switch>
        </DashboardLayout>
      </div>
    </Router>
  );
}

export default App;
