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
import CustomToolbar from "../mui-datatables/CustomToolbarClients";

import firebase from "../Common/firebase";
import { titles } from "../Common/titleList";
import { genders } from "../Common/genderList";
import { maritalStatuses } from "../Common/maritalStatusList";

const styles = theme => ({
  // Overiding css properties on material ui textbox
  notchedOutline: {
    borderWidth: "1px",
    borderColor: "black !important"
  }
});

class ClientList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      open: false,

      key: "",
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

  openDialog = () => {
    this.setState({ open: true });
  };

  closeDialog = () => {
    this.setState({ open: false });
  };

  componentDidMount() {
    const clientsRef = firebase.database().ref("clients");

    clientsRef.on("value", snapshot => {
      let items = snapshot.val();
      let newState = [];
      for (let item in items) {
        newState.push({
          id: item,
          firstName: items[item].firstName,
          lastName: items[item].lastName,
          title: items[item].title,
          gender: items[item].gender,
          maritalStatus: items[item].maritalStatus,
          phone1: items[item].phone1,
          phone2: items[item].phone2,
          address: items[item].address
        });
      }

      //console.log(newState);
      this.setState({
        data: newState
      });
      //console.log(this.state.data);
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

  toTitleCase = phrase => {
    return phrase
      .toLowerCase()
      .split(" ")
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  updateClient(id) {
    //const recordToEdit = this.state.data.find(item => item.id === id);
    //console.log(recordToEdit);
    this.openDialog();

    const key = id;
    const clientsRef = firebase.database().ref(`clients/${key}`);
    clientsRef.on("value", snapshot => {
      this.setState({
        key: snapshot.key,
        firstName: snapshot.child("firstName").val(),
        lastName: snapshot.child("lastName").val(),
        title: snapshot.child("title").val(),
        gender: snapshot.child("gender").val(),
        maritalStatus: snapshot.child("maritalStatus").val(),
        phone1: snapshot.child("phone1").val(),
        phone2: snapshot.child("phone2").val(),
        address: snapshot.child("address").val()
      });
    });
    console.log(
      "############### Veryfing state is working ###################"
    );
  }

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
      address: this.toTitleCase(this.state.address)
    };

    //Update farmer module
    const key = this.state.key;
    const clientsRef = firebase.database().ref(`clients/${key}`);
    clientsRef
      .update(client)
      .then(function() {
        console.log("Synchronization succeeded");
      })
      .catch(function(error) {
        console.log("Synchronization failed");
      });
  };

  render() {
    const { classes } = this.props;
    const { data } = this.state;

    const columns = [
      {
        name: "Client name",
        options: {
          filter: false,
          sort: true
        }
      },
      {
        name: "Title",
        options: {
          filter: false,
          sort: false
        }
      },
      {
        name: "Gender",
        options: {
          filter: false,
          sort: false
        }
      },
      {
        name: "Marital Status",
        options: {
          filter: false,
          sort: false
        }
      },
      {
        name: "Address",
        options: {
          filter: false,
          sort: false
        }
      },
      {
        name: "Phone 1",
        options: {
          filter: false,
          sort: false
        }
      },
      {
        name: "Phone 2",
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

        // Perform client deletion and cascade to all other related objects(loans & installments)
        firebase
          .database()
          .ref("clients")
          .child(id)
          .remove();

        firebase
          .database()
          .ref("loans")
          .child(id)
          .remove();
      }
    };

    return (
      <Fragment>
        <MUIDataTable
          title={"Client list"}
          data={data.map(c => {
            return [
              <Link
                to={`/clients/${c.id}`}
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
                {c.title}
              </div>,
              <div
                style={{
                  fontSize: 18
                }}
              >
                {c.gender}
              </div>,
              <div
                style={{
                  fontSize: 18
                }}
              >
                {c.maritalStatus}
              </div>,
              <div
                style={{
                  fontSize: 18
                }}
              >
                {c.address}
              </div>,
              <div
                style={{
                  fontSize: 18
                }}
              >
                {c.phone1}
              </div>,
              <div
                style={{
                  fontSize: 18
                }}
              >
                {c.phone2}
              </div>,

              <IconButton
                color="primary"
                //onClick={() => this.updateFarmer(index)}
                // The bind method also works
                onClick={this.updateClient.bind(this, c.id)}
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
              Edit Client
            </Typography>
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description" color="primary">
              <br />
              <form onSubmit={this.handleSubmit}>
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
                  <Grid item xs={6} sm={6}>
                    <TextField
                      id="title"
                      select
                      name="title"
                      value={this.state.title}
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
                      value={this.state.gender}
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
                      value={this.state.maritalStatus}
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
                      value={this.state.address}
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
                      mask="(+256) 999 999 999"
                      value={this.state.phone1}
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
                      mask="(+256) 999 999 999"
                      value={this.state.phone2}
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
                      size="large"
                      fullWidth
                      color="primary"
                    >
                      Update Client
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

ClientList.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ClientList);
