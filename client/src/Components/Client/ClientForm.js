import React, { Component, Fragment } from "react";
import { withStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import InputMask from "react-input-mask";

import MenuItem from "@material-ui/core/MenuItem";

import firebase from "../Common/firebase";
import { titles } from "../Common/titleList";
import { genders } from "../Common/genderList";
import { maritalStatuses } from "../Common/maritalStatusList";

//import NumberFormat from "react-number-format";

//var NumberFormat = require('react-number-format');

const styles = theme => ({
  root: {
    flexGrow: 1,
    zoom: "70%"
  },
  // Overiding css properties on material ui textbox
  notchedOutline: {
    borderWidth: "1px",
    borderColor: "black !important"
  }
});

class ClientForm extends Component {
  constructor() {
    super();
    this.state = {
      firstName: "",
      lastName: "",
      title: "",
      gender: "",
      maritalStatus: "",
      address: "",
      phone1: "",
      phone2: ""
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
    const client = {
      firstName: this.toTitleCase(this.state.firstName),
      lastName: this.toTitleCase(this.state.lastName),
      title: this.state.title,
      gender: this.state.gender,
      maritalStatus: this.state.maritalStatus,
      phone1: this.state.phone1,
      phone2: this.state.phone2,
      address: this.toTitleCase(this.state.address),
      created: new Date().toLocaleString("en-GB", {
        timeZone: "Africa/Nairobi"
      })
    };

    console.log(client);

    //Save farmer module
    const clientsRef = firebase.database().ref("clients");
    clientsRef.push(client);

    //Clear the Client form inputs
    this.setState({
      firstName: "",
      lastName: "",
      title: "",
      gender: "",
      maritalStatus: "",
      address: "",
      phone1: "",
      phone2: ""
    });
  };

  render() {
    const { classes } = this.props;
    const {
      firstName,
      lastName,
      title,
      gender,
      maritalStatus,
      address,
      phone1,
      phone2
    } = this.state;

    return (
      <Fragment>
        <div className={classes.root}>
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
              <Grid item xs={6} sm={6}>
                <TextField
                  id="title"
                  select
                  name="title"
                  value={title}
                  onChange={this.onChange}
                  label="Title*"
                  fullWidth
                  helperText="Please select title"
                  InputLabelProps={{
                    shrink: true
                  }}
                >
                  {titles.map(option => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={6} sm={6}>
                <TextField
                  id="gender"
                  select
                  name="gender"
                  value={gender}
                  onChange={this.onChange}
                  label="Gender*"
                  fullWidth
                  helperText="Please select gender"
                  InputLabelProps={{
                    shrink: true
                  }}
                >
                  {genders.map(option => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={12} sm={12}>
                <TextField
                  id="maritalStatus"
                  select
                  name="maritalStatus"
                  value={maritalStatus}
                  onChange={this.onChange}
                  label="Marital Status*"
                  fullWidth
                  helperText="Please select marital status"
                  InputLabelProps={{
                    shrink: true
                  }}
                >
                  {maritalStatuses.map(option => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={12} sm={12}>
                <TextField
                  id="address"
                  name="address"
                  value={address}
                  onChange={this.onChange}
                  label="Address"
                  multiline
                  rowsMax="4"
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
              <Grid item xs={6} sm={6}>
                <InputMask
                  mask="256999999999"
                  value={phone1}
                  onChange={this.onChange}
                >
                  {() => (
                    <TextField
                      id="phone1"
                      name="phone1"
                      label="Phone 1"
                      fullWidth
                      margin="normal"
                      //variant="outlined"
                      autoComplete="phone1"
                      InputProps={{
                        classes: {
                          notchedOutline: classes.notchedOutline
                        }
                      }}
                    />
                  )}
                </InputMask>
              </Grid>
              <Grid item xs={6} sm={6}>
                <InputMask
                  mask="256999999999"
                  value={phone2}
                  onChange={this.onChange}
                >
                  {() => (
                    <TextField
                      id="phone2"
                      name="phone2"
                      label="Phone 2"
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
                  )}
                </InputMask>
              </Grid>

              <Grid item xs={12} sm={12}>
                <br />
                <Button
                  type="submit"
                  variant="contained"
                  size="small"
                  fullWidth
                  color="primary"
                >
                  Save Client
                </Button>
              </Grid>
            </Grid>
          </form>
        </div>
      </Fragment>
    );
  }
}

export default withStyles(styles)(ClientForm);
