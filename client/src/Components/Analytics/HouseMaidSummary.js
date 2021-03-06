import React, { Component, Fragment } from "react";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Grid from "@material-ui/core/Grid";

import firebase from "../Common/firebase";
import numeral from "numeral";

const styles = theme => ({
  bigAvatar: {
    width: 200,
    height: 200
  }
});

class HouseMaidSummary extends Component {
  constructor() {
    super();
    this.state = {
      numOfMaids: 0
    };
  }

  componentDidMount() {
    // Get client count
    const maidsRef = firebase.database().ref("maids");
    maidsRef.on("value", snapshot => {
      const maidCount = snapshot.numChildren();
      this.setState({
        numOfMaids: maidCount
      });
    });
  }
  render() {
    const { classes } = this.props;

    return (
      <Fragment>
        <Grid container spacing={24}>
          <Grid item xs={12} sm={12}>
            <Card className={classes.card}>
              <CardContent align="center">
                <Typography
                  variant="h5"
                  align="center"
                  gutterBottom
                  style={{ color: "black" }}
                >
                  House Maids
                </Typography>
                <br />
                <img
                  alt="Remy Sharp"
                  src="/static/images/maids.png"
                  className={classes.bigAvatar}
                />
                <br />
                <br />
                <Grid container spacing={24}>
                  <Grid item xs={4} sm={4} />
                  <Grid item xs={4} sm={4}>
                    <Typography
                      variant="h5"
                      align="center"
                      gutterBottom
                      style={{ color: "black" }}
                    >
                      {numeral(this.state.numOfMaids).format("0,0")}
                    </Typography>
                  </Grid>
                  <Grid item xs={4} sm={4} />
                </Grid>
                <br />
              </CardContent>
            </Card>
            <br />

            <br />
          </Grid>
        </Grid>
      </Fragment>
    );
  }
}

export default withStyles(styles)(HouseMaidSummary);
