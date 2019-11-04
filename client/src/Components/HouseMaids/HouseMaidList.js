import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";

import MenuItem from "@material-ui/core/MenuItem";

import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import EditIcon from "@material-ui/icons/Edit";

import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import InputMask from "react-input-mask";

import { Typography } from "@material-ui/core";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

import MUIDataTable from "mui-datatables";
import CustomToolbar from "../mui-datatables/CustomToolbarMaid";

import firebase from "../Common/firebase";
import { districts } from "../Common/districtList";

const styles = theme => ({
  // Overiding css properties on material ui textbox
  notchedOutline: {
    borderWidth: "1px",
    borderColor: "black !important"
  }
});

class HouseMaidList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      open: false,

      key: "",
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
    };
  }

  openDialog = () => {
    this.setState({ open: true });
  };

  closeDialog = () => {
    this.setState({ open: false });
  };

  componentDidMount() {
    const maidsRef = firebase.database().ref("maids");

    maidsRef.on("value", snapshot => {
      let items = snapshot.val();
      let newState = [];

      for (let item in items) {
        newState.push({
          id: item,
          firstName: items[item].firstName,
          lastName: items[item].lastName,
          registrationNo: items[item].registrationNo,
          nin: items[item].nin,
          maidContact: items[item].maidContact,
          guardianName: items[item].guardianName,
          guardianContact: items[item].guardianContact,
          homeDistrict: items[item].homeDistrict,
          village: items[item].village,
          lc1Name: items[item].lc1Name,
          lc1Contact: items[item].lc1Contact,
          url: items[item].url
        });
      }

      //console.log(newState);
      this.setState({
        data: newState
      });
      console.log(this.state.data);
    });
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
    const uploadTask = firebase
      .storage()
      .ref(`/passport-photos/${randomId}`)
      .put(e.target.files[0]);

    uploadTask
      .then(uploadTaskSnapshot => {
        return uploadTaskSnapshot.ref.getDownloadURL();
      })
      .then(url => {
        this.setState({ url: url });
        console.log(this.state);
      });
  }

  toTitleCase = phrase => {
    return phrase
      .toLowerCase()
      .split(" ")
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  updateMaid(id) {
    //const recordToEdit = this.state.data.find(item => item.id === id);
    //console.log(recordToEdit);
    this.openDialog();

    const key = id;
    const maidsRef = firebase.database().ref(`maids/${key}`);
    maidsRef.on("value", snapshot => {
      this.setState({
        key: snapshot.key,
        firstName: snapshot.child("firstName").val(),
        lastName: snapshot.child("lastName").val(),
        registrationNo: snapshot.child("registrationNo").val(),
        nin: snapshot.child("nin").val(),
        maidContact: snapshot.child("maidContact").val(),
        guardianName: snapshot.child("guardianName").val(),
        guardianContact: snapshot.child("guardianContact").val(),
        homeDistrict: snapshot.child("homeDistrict").val(),
        village: snapshot.child("village").val(),
        lc1Name: snapshot.child("lc1Name").val(),
        lc1Contact: snapshot.child("lc1Contact").val(),
        url: snapshot.child("url").val()
      });
    });
    console.log(
      "############### Veryfing state is working ###################"
    );
  }

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
      url: this.state.url
    };

    //Update farmer module
    const key = this.state.key;
    const maidsRef = firebase.database().ref(`maids/${key}`);
    maidsRef
      .update(maid)
      .then(function() {
        console.log("Synchronization succeeded");
      })
      .catch(function(error) {
        console.log("Synchronization failed");
      });

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
    const { data } = this.state;

    const columns = [
      {
        name: "",
        options: {
          filter: false,
          sort: false
        }
      },
      {
        name: "Maid name",
        options: {
          filter: false,
          sort: true
        }
      },
      {
        name: "Registration No",
        options: {
          filter: false,
          sort: false
        }
      },
      {
        name: "National ID Number",
        options: {
          filter: false,
          sort: false
        }
      },
      {
        name: "Maid Contact",
        options: {
          filter: false,
          sort: false
        }
      },
      {
        name: "Guardian Name",
        options: {
          filter: false,
          sort: false
        }
      },
      {
        name: "Guardian Contact",
        options: {
          filter: false,
          sort: false
        }
      },
      {
        name: "Home district",
        options: {
          filter: false,
          sort: false
        }
      },
      {
        name: "Village",
        options: {
          filter: false,
          sort: false
        }
      },
      {
        name: "LC 1 Name",
        options: {
          filter: false,
          sort: false
        }
      },
      {
        name: "LC 1 Contact",
        options: {
          filter: false,
          sort: false
        }
      },

      {
        name: "Actions",
        options: {
          filter: false,
          sort: false
        }
      }
    ];

    const options = {
      filter: true,
      filterType: "dropdown",
      responsive: "scroll",
      serverSide: false,
      rowsPerPage: 10,
      pagination: true,
      customToolbar: () => {
        return <CustomToolbar />;
      },

      onRowsDelete: rowsDeleted => {
        // get the corresponding id in state
        const row = rowsDeleted.data[0].index;
        const id = this.state.data[row]["id"];
        console.log(id);

        // Perform maid deletion and cascade to all other related objects(loans & installments)
        firebase
          .database()
          .ref("maids")
          .child(id)
          .remove();
      }
    };

    return (
      <Fragment>
        <MUIDataTable
          title={"House Maid list"}
          data={data.map(c => {
            return [
              <div>
                <img
                  src={
                    //this.state.passport_photo ||
                    //"static/images/passportPhoto.png" ||
                    c.url
                    //"gs://menlyn-home-care-agency.appspot.com/passport-photos/01pbsnybzsq6"
                  }
                  alt=""
                  height="60"
                  width="60"
                />
              </div>,
              <Link
                //to={`/clients/${c.id}`}
                style={{
                  color: "darkblue",
                  textDecoration: "none",
                  fontSize: 18
                }}
              >
                {c.lastName + " " + c.firstName}
              </Link>,

              <div
                style={{
                  fontSize: 18
                }}
              >
                {c.registrationNo}
              </div>,
              <div
                style={{
                  fontSize: 18
                }}
              >
                {c.nin}
              </div>,
              <div
                style={{
                  fontSize: 18
                }}
              >
                {c.maidContact}
              </div>,
              <div
                style={{
                  fontSize: 18
                }}
              >
                {c.guardianName}
              </div>,
              <div
                style={{
                  fontSize: 18
                }}
              >
                {c.guardianContact}
              </div>,
              <div
                style={{
                  fontSize: 18
                }}
              >
                {c.homeDistrict}
              </div>,
              <div
                style={{
                  fontSize: 18
                }}
              >
                {c.village}
              </div>,
              <div
                style={{
                  fontSize: 18
                }}
              >
                {c.lc1Name}
              </div>,
              <div
                style={{
                  fontSize: 18
                }}
              >
                {c.lc1Contact}
              </div>,

              <IconButton
                color="primary"
                //onClick={() => this.updateFarmer(index)}
                // The bind method also works
                onClick={this.updateMaid.bind(this, c.id)}
              >
                <EditIcon color="primary" />
              </IconButton>
            ];
          })}
          columns={columns}
          options={options}
        />

        <Dialog
          maxWidth="sm"
          open={this.state.open}
          onClose={this.closeDialog}
          aria-labelledby="form-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle
            id="simple-dialog-title"
            color="default"
            style={{ backgroundColor: "teal" }}
          >
            <Typography
              variant="h4"
              align="center"
              gutterBottom
              style={{ color: "white" }}
            >
              Edit House Maid
            </Typography>
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description" color="primary">
              <br />
              <form onSubmit={this.handleSubmit}>
                <Grid container spacing={2}>
                  <Grid item xs={8} sm={8} />
                  <Grid item xs={4} sm={4}>
                    <img src={this.state.url} alt="" height="120" width="120" />
                  </Grid>
                </Grid>
                <Typography
                  variant="h5"
                  gutterBottom
                  style={{ color: "black" }}
                >
                  Bio-data
                </Typography>

                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      id="firstName"
                      name="firstName"
                      value={this.state.firstName}
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
                      value={this.state.lastName}
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
                      value={this.state.registrationNo}
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
                      value={this.state.nin}
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
                      value={this.state.maidContact}
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
                    <Typography
                      variant="h5"
                      gutterBottom
                      style={{ color: "black" }}
                    >
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
                    <Typography
                      variant="h5"
                      gutterBottom
                      style={{ color: "black" }}
                    >
                      Guardian Information
                    </Typography>
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      id="guardianName"
                      name="guardianName"
                      value={this.state.guardianName}
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
                      value={this.state.guardianContact}
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
                    <Typography
                      variant="h5"
                      gutterBottom
                      style={{ color: "black" }}
                    >
                      Location Information
                    </Typography>
                  </Grid>

                  <Grid item xs={12} sm={12}>
                    <TextField
                      required
                      id="homeDistrict"
                      select
                      name="homeDistrict"
                      value={this.state.homeDistrict}
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
                      value={this.state.village}
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
                      value={this.state.lc1Name}
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
                      value={this.state.lc1Contact}
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
                      Update Record
                    </Button>
                  </Grid>
                </Grid>
              </form>
              <br />
            </DialogContentText>
          </DialogContent>
        </Dialog>
      </Fragment>
    );
  }
}

HouseMaidList.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(HouseMaidList);
