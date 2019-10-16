import React from "react";
import PropTypes from "prop-types";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import AddIcon from "@material-ui/icons/Add";
import { withStyles } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import Button from "@material-ui/core/Button";

import { Route } from "react-router-dom";

import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";

import { Typography } from "@material-ui/core";

import InstallmentForm from "../Installment/InstallmentForm";

const styles = theme => ({
  iconButton: {},
  dialogPaper: {}
});

class CustomToolbar extends React.Component {
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
            <AddIcon color="default" className={classes.addIcon} />
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
              backgroundColor: "#2E3B55"
            }}
          >
            <Typography
              component="h1"
              variant="display1"
              align="center"
              style={{ color: "white" }}
            >
              Add Installment
            </Typography>
          </DialogTitle>
          <DialogContent>
            <Route path="/clients/:id" component={InstallmentForm} />
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

CustomToolbar.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles, { name: "CustomToolbar" })(CustomToolbar);
