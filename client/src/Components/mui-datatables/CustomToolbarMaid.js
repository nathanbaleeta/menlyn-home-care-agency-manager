import React from "react";
import PropTypes from "prop-types";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import { withStyles } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import Button from "@material-ui/core/Button";

import { Route } from "react-router-dom";

import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";

import { Typography } from "@material-ui/core";

import AddHouseMaid from "../HouseMaids/AddHouseMaid";

const styles = theme => ({
  iconButton: {},
  dialogPaper: {}
});

class CustomToolbarMaid extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false
    };
  }

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    const { classes } = this.props;

    return (
      <React.Fragment>
        <Tooltip title={"Add Loan"}>
          <IconButton className={classes.iconButton} onClick={this.handleOpen}>
            <PersonAddIcon color="primary" className={classes.addIcon} />
          </IconButton>
        </Tooltip>

        <Dialog
          id="myDialog"
          open={this.state.open}
          aria-labelledby="form-dialog-title"
          onClose={this.handleClose}
        >
          <DialogTitle
            id="simple-dialog-title"
            color="default"
            style={{
              backgroundColor: "teal"
            }}
          >
            <Typography
              variant="h4"
              align="center"
              gutterBottom
              style={{ color: "white" }}
            >
              Add House Maid
            </Typography>
          </DialogTitle>
          <DialogContent>
            <Route path="/house-maids" component={AddHouseMaid} />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
          </DialogActions>
        </Dialog>
      </React.Fragment>
    );
  }
}

CustomToolbarMaid.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles, { name: "CustomToolbar" })(CustomToolbarMaid);
