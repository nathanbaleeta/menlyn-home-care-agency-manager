import React from "react";

import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";

import Visualization from "../Analytics/Visualization";

const styles = theme => ({
  root: {
    flexGrow: 1,
    zoom: "74%"
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary
  }
});

class Dashboard extends React.Component {
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <Visualization />
      </div>
    );
  }
}

Dashboard.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Dashboard);
