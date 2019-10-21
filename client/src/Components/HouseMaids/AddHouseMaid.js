import React, { Component, Fragment } from "react";
import { withStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import InputMask from "react-input-mask";

import MenuItem from "@material-ui/core/MenuItem";

import firebase from "../Common/firebase";
import { genders } from "../Common/genderList";
import { maritalStatuses } from "../Common/maritalStatusList";

//import NumberFormat from "react-number-format";

//var NumberFormat = require('react-number-format');

const styles = theme => ({
  // Overiding css properties on material ui textbox
  notchedOutline: {
    borderWidth: "1px",
    borderColor: "black !important"
  }
});

class AddHouseMaid extends Component {
  constructor() {
    super();
    this.state = {
      firstName: "",
      lastName: "",
      registrationNo: "",
      nin: "",
      maidContact: "",
      guardianName: "",
      guardianContact: "",
      homeDistrict: "",
      village: "",
      lc1Name: "",
      lc1Contact: ""
    };
  }

  onChange = e => {
    /*
          Because we named the inputs to match their
          corresponding values in state, it's
          super easy to update the state
        */
    this.setState({ [e.target.name]: e.target.value });
  };

  toTitleCase = phrase => {
    return phrase
      .toLowerCase()
      .split(" ")
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  handleSubmit = event => {
    event.preventDefault();

    // get our form data out of state
    const maid = {
      firstName: this.toTitleCase(this.state.firstName),
      lastName: this.toTitleCase(this.state.lastName),
      registrationNo: this.state.registrationNo,
      nin: this.state.nin,
      maidContact: this.state.maidContact,
      guardianName: this.toTitleCase(this.state.guardianName),
      guardianContact: this.state.guardianContact,
      homeDistrict: this.state.homeDistrict,
      village: this.toTitleCase(this.state.village),
      lc1Name: this.toTitleCase(this.state.lc1Name),
      lc1Contact: this.state.lc1Contact,
      created: new Date().toLocaleString("en-GB", {
        timeZone: "Africa/Nairobi"
      })
    };

    console.log(maid);

    //Save farmer module
    const maidsRef = firebase.database().ref("maids");
    maidsRef.push(maid);

    //Clear the Client form inputs
    this.setState({
      firstName: "",
      lastName: "",
      registrationNo: "",
      nin: "",
      maidContact: "",
      guardianName: "",
      guardianContact: "",
      homeDistrict: "",
      village: "",
      lc1Name: "",
      lc1Contact: ""
    });
  };

  render() {
    const { classes } = this.props;
    const {
      firstName,
      lastName,
      registrationNo,
      nin,
      maidContact,
      guardianName,
      guardianContact,
      homeDistrict,
      village,
      lc1Name,
      lc1Contact
    } = this.state;

    return (
      <Fragment>
        <br />
        <form onSubmit={this.handleSubmit}>
          <Typography variant="h5" gutterBottom style={{ color: "black" }}>
            Bio-data
          </Typography>

          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="firstName"
                name="firstName"
                value={firstName}
                onChange={this.onChange}
                label="First name"
                fullWidth
                margin="normal"
                //variant="outlined"
                autoComplete="off"
                InputProps={{
                  classes: {
                    notchedOutline: classes.notchedOutline
                  }
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="lastName"
                name="lastName"
                value={lastName}
                onChange={this.onChange}
                label="Last name"
                fullWidth
                margin="normal"
                //variant="outlined"
                autoComplete="off"
                InputProps={{
                  classes: {
                    notchedOutline: classes.notchedOutline
                  }
                }}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="registrationNo"
                name="registrationNo"
                value={registrationNo}
                onChange={this.onChange}
                label="Registration Number"
                fullWidth
                margin="normal"
                //variant="outlined"
                autoComplete="off"
                InputProps={{
                  classes: {
                    notchedOutline: classes.notchedOutline
                  }
                }}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="nin"
                name="nin"
                value={nin}
                onChange={this.onChange}
                label="National ID Number"
                fullWidth
                margin="normal"
                //variant="outlined"
                autoComplete="off"
                InputProps={{
                  classes: {
                    notchedOutline: classes.notchedOutline
                  }
                }}
              />
            </Grid>

            <Grid item xs={12} sm={12}>
              <InputMask
                mask="256999999999"
                value={maidContact}
                onChange={this.onChange}
              >
                {() => (
                  <TextField
                    id="maidContact"
                    name="maidContact"
                    label="Maid Contact"
                    fullWidth
                    margin="normal"
                    //variant="outlined"
                    autoComplete="maidContact"
                    InputProps={{
                      classes: {
                        notchedOutline: classes.notchedOutline
                      }
                    }}
                  />
                )}
              </InputMask>
            </Grid>

            <Grid item xs={12} sm={12}>
              <Typography variant="h5" gutterBottom style={{ color: "black" }}>
                Guardian Information
              </Typography>
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="guardianName"
                name="guardianName"
                value={guardianName}
                onChange={this.onChange}
                label="Guardian name"
                fullWidth
                margin="normal"
                //variant="outlined"
                autoComplete="off"
                InputProps={{
                  classes: {
                    notchedOutline: classes.notchedOutline
                  }
                }}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <InputMask
                mask="256999999999"
                value={guardianContact}
                onChange={this.onChange}
              >
                {() => (
                  <TextField
                    id="guardianContact"
                    name="guardianContact"
                    label="Guardian Contact"
                    fullWidth
                    margin="normal"
                    //variant="outlined"
                    autoComplete="guardianContact"
                    InputProps={{
                      classes: {
                        notchedOutline: classes.notchedOutline
                      }
                    }}
                  />
                )}
              </InputMask>
            </Grid>

            <Grid item xs={12} sm={12}>
              <Typography variant="h5" gutterBottom style={{ color: "black" }}>
                Location Information
              </Typography>
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="homeDistrict"
                name="homeDistrict"
                value={homeDistrict}
                onChange={this.onChange}
                label="Home District"
                fullWidth
                margin="normal"
                //variant="outlined"
                autoComplete="off"
                InputProps={{
                  classes: {
                    notchedOutline: classes.notchedOutline
                  }
                }}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="village"
                name="village"
                value={village}
                onChange={this.onChange}
                label="Village"
                fullWidth
                margin="normal"
                //variant="outlined"
                autoComplete="off"
                InputProps={{
                  classes: {
                    notchedOutline: classes.notchedOutline
                  }
                }}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="lc1Name"
                name="lc1Name"
                value={lc1Name}
                onChange={this.onChange}
                label="LC 1 Name"
                fullWidth
                margin="normal"
                //variant="outlined"
                autoComplete="off"
                InputProps={{
                  classes: {
                    notchedOutline: classes.notchedOutline
                  }
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <InputMask
                mask="256999999999"
                value={lc1Contact}
                onChange={this.onChange}
              >
                {() => (
                  <TextField
                    id="lc1Contact"
                    name="lc1Contact"
                    label="LC 1 Contact"
                    fullWidth
                    margin="normal"
                    //variant="outlined"
                    autoComplete="lc1Contact"
                    InputProps={{
                      classes: {
                        notchedOutline: classes.notchedOutline
                      }
                    }}
                  />
                )}
              </InputMask>
            </Grid>

            <Grid item xs={12} sm={12}>
              <br />
              <Button
                type="submit"
                variant="contained"
                size="large"
                fullWidth
                color="primary"
              >
                Save Record
              </Button>
            </Grid>
          </Grid>
        </form>
      </Fragment>
    );
  }
}

export default withStyles(styles)(AddHouseMaid);
