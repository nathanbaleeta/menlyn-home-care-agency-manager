import React from "react";
import { CssBaseline, withStyles } from "@material-ui/core";
import { Switch, Route } from "react-router-dom";

import Header from "./Components/Layout/Header";
import Dashboard from "./Components/Analytics/Dashboard";
import ClientList from "./Components/Client/ClientList";

const styles = theme => ({
  main: {
    padding: 3 * theme.spacing.unit,
    [theme.breakpoints.down("xs")]: {
      padding: 2 * theme.spacing.unit
    }
  }
});

const App = ({ classes }) => (
  <React.Fragment>
    <CssBaseline />
    <Header />
    <br />
    <br />
    <br />
    <br />
    <main className={classes.main}>
      <Switch>
        <Route exact path="/" component={Dashboard} />
        <Route exact path="/clients" component={ClientList} />
      </Switch>
    </main>
  </React.Fragment>
);

export default withStyles(styles)(App);
