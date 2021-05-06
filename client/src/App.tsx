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
import _Questions from "./pages/_Questions";
import _QuestionEditForm from "./pages/_QuestionEditForm";
import _PatientScheduler from "./pages/_PatientScheduler";
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
            <Route path="/patients/new" component={_PatientCreateForm} />
            <Route path="/patients/:id/edit" component={_PatientEditForm} />
            <Route path="/patients/:id" component={PatientDetailPage} />
            <Route path="/patients" component={_Patients} />
            <Route path="/scheduler" component={_PatientScheduler} />
            <Route path="/questionnaire/edit" component={_QuestionEditForm} />
            <Route path="/questionnaire" component={_Questions} />
            <Route path="*" component={_PageNotFound} />
          </Switch>
        </DashboardLayout>
      </div>
    </Router>
  );
}

export default App;
