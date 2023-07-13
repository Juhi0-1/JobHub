import { createContext, useState } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { Grid, makeStyles } from "@material-ui/core";


import Welcome, { ErrorPage } from "./component/Welcome.js";
import Navbar from "./component/Navbar.js";
import Login from "./component/Login.js";
import Logout from "./component/Logout.js";
import Signup from "./component/Signup.js";
import Home from "./component/Home.js";
import Applications from "./component/Applications.js";
import Profile from "./component/Profile.js";
import CreateJobs from "./component/recruiter/CreateJobs.js";
import MyJobs from "./component/recruiter/MyJobs.js";
import JobApplications from "./component/recruiter/JobApplications.js";
import AcceptedApplicants from "./component/recruiter/AcceptedApplicants.js";
import RecruiterProfile from "./component/recruiter/Profile.js";
import MessagePopup from "./lib/MessagePopup.js";
import isAuth, { userType } from "./lib/isAuth.js";

const useStyles = makeStyles((theme) => ({
  body: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "98vh",
    paddingTop: "64px",
    boxSizing: "border-box",
    width: "100%",
  },
}));

export const SetPopupContext = createContext();

function App() {
  const classes = useStyles();
  const [popup, setPopup] = useState({
    open: false,
    severity: "",
    message: "",
  });
  return (
    <BrowserRouter>
      <SetPopupContext.Provider value={setPopup}>
        <Grid container direction="column">
          <Grid item xs>
            <Navbar />
          </Grid>
          <Grid item className={classes.body}>
            <Switch>
              <Route exact path="/">
                <Welcome />
              </Route>
              <Route exact path="/login">
                <Login />
              </Route>
              <Route exact path="/signup">
                <Signup />
              </Route>
              <Route exact path="/logout">
                <Logout />
              </Route>
              <Route exact path="/home">
                <Home />
              </Route>
              <Route exact path="/applications">
                <Applications />
              </Route>
              <Route exact path="/profile">
                {userType() === "recruiter" ? (
                  <RecruiterProfile />
                ) : (
                  <Profile />
                )}
              </Route>
              <Route exact path="/addjob">
                <CreateJobs />
              </Route>
              <Route exact path="/myjobs">
                <MyJobs />
              </Route>
              <Route exact path="/job/applications/:jobId">
                <JobApplications />
              </Route>
              <Route exact path="/employees">
                <AcceptedApplicants />
              </Route>
              <Route>
                <ErrorPage />
              </Route>
            </Switch>
          </Grid>
        </Grid>
        <MessagePopup
          open={popup.open}
          setOpen={(status) =>
            setPopup({
              ...popup,
              open: status,
            })
          }
          severity={popup.severity}
          message={popup.message}
        />
      </SetPopupContext.Provider>
    </BrowserRouter>
  );
}

export default App;
