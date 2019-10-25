import React, { Component, Fragment } from "react";
import { withStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import MenuItem from "@material-ui/core/MenuItem";
import InputMask from "react-input-mask";

import firebase from "../Common/firebase";
import { districts } from "../Common/districtList";

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
      passport_photo: "",
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
      lc1Contact: "",
      image: null,
      url: "",
      progress: 0
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

  handleImageChange(e) {
    e.preventDefault();

    // Preview passport phot uploaded by adding it to state object
    this.setState({
      passport_photo: URL.createObjectURL(e.target.files[0])
    });

    // create a random id
    const randomId = Math.random()
      .toString(36)
      .substring(2);

    // Upload passport photo to firebase
    firebase
      .storage()
      .ref(`/passport-photos/${randomId}`)
      .put(e.target.files[0])
      .then(result => {
        console.log();
        this.setState({
          url: result.metadata.fullPath
        });
        console.log(result.metadata.fullPath);
      });
  }

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
      url: this.state.url,
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
      passport_photo: "",
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
      lc1Contact: "",
      url: ""
    });
  };

  render() {
    const { classes } = this.props;
    const {
      passport_photo,
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
          <Grid container spacing={2}>
            <Grid item xs={8} sm={8} />
            <Grid item xs={4} sm={4}>
              <img
                src={passport_photo || "static/images/passportPhoto.png"}
                alt="Uploaded Images"
                height="120"
                width="120"
              />
            </Grid>
          </Grid>
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
                autoComplete="off"
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
                autoComplete="off"
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
                autoComplete="off"
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
                autoComplete="off"
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
                    autoComplete="maidContact"
                  />
                )}
              </InputMask>
            </Grid>

            <Grid item xs={12} sm={12}>
              <Typography variant="h5" gutterBottom style={{ color: "black" }}>
                Passport Photo data
              </Typography>
            </Grid>

            <Grid item xs={12} sm={12}>
              <TextField
                id="passport-photo"
                label="Passport Photo"
                type="file"
                className={classes.textField}
                margin="normal"
                variant="outlined"
                fullWidth
                name="passport_photo"
                onChange={e => this.handleImageChange(e)}
                InputLabelProps={{
                  shrink: true
                }}
                InputProps={{
                  classes: {
                    notchedOutline: classes.notchedOutline
                  }
                }}
              />
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
                autoComplete="off"
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
                    autoComplete="guardianContact"
                  />
                )}
              </InputMask>
            </Grid>

            <Grid item xs={12} sm={12}>
              <Typography variant="h5" gutterBottom style={{ color: "black" }}>
                Location Information
              </Typography>
            </Grid>

            <Grid item xs={12} sm={12}>
              <TextField
                required
                id="homeDistrict"
                select
                name="homeDistrict"
                value={homeDistrict}
                onChange={this.onChange}
                label="Home District*"
                fullWidth
                //helperText="Please select home district"
                InputLabelProps={{
                  shrink: true
                }}
              >
                {districts.map(option => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>

            <Grid item xs={12} sm={12}>
              <TextField
                required
                id="village"
                name="village"
                value={village}
                onChange={this.onChange}
                label="Village"
                fullWidth
                margin="normal"
                autoComplete="off"
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
                autoComplete="off"
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
                    autoComplete="lc1Contact"
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
