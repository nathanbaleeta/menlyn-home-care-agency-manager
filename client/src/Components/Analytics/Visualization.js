import React from "react";

import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

import Grid from "@material-ui/core/Grid";

import ClientSummary from "./ClientSummary";
import ClientReport from "./ClientReport";

const styles = theme => ({
  root: {
    flexGrow: 1
  },
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: "center",
    color: theme.palette.text.secondary
  },
  icon: {
    margin: theme.spacing.unit,
    fontSize: 32,
    color: theme.palette.text.primary
  }
});

class Visualization extends React.Component {
  render() {
    //const { classes } = this.props;

    return (
      <div>
        <Typography
          variant="h4"
          align="center"
          gutterBottom
          style={{ color: "black" }}
        >
          Data Analytics
        </Typography>
        <br />
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={3}>
            <ClientSummary />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <ClientSummary />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <ClientSummary />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <ClientSummary />
          </Grid>
        </Grid>
        <br /> <br /> <br />
        <Typography
          variant="h4"
          align="center"
          gutterBottom
          style={{ color: "black" }}
        >
          Summary Reports
        </Typography>
        <br />
        <Grid container spacing={24}>
          <Grid item xs={12} sm={6} md={3}>
            <ClientReport />
          </Grid>
        </Grid>
      </div>
    );
  }
}

Visualization.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Visualization);
