import React from "react";
import PropTypes from "prop-types";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";

import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import { withStyles } from "@material-ui/core/styles";
import AccountCircle from "@material-ui/icons/AccountCircle";
import PollIcon from "@material-ui/icons/Poll";
import GroupIcon from "@material-ui/icons/Group";

import MoreIcon from "@material-ui/icons/MoreVert";
import { Link } from "react-router-dom";
import Grid from "@material-ui/core/Grid";

const styles = theme => ({
  root: {
    width: "100%",
    zoom: "70%"
  },
  grow: {
    flexGrow: 1
  },
  menuButton: {
    textTransform: "capitalize",
    fontWeight: "bold",
    marginLeft: -12,
    marginRight: 20
  },
  link: {
    textDecoration: "none",
    color: "white"
  },
  linkMobile: {
    textDecoration: "none",
    color: "black"
  },
  avatar: {
    height: 55,
    width: 55
  },
  title: {
    paddingLeft: "10px",
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block"
    }
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: "white",
    /* "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.75)
    }, */
    marginRight: theme.spacing.unit * 2,
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing.unit * 8,
      width: "auto"
    }
  },

  inputRoot: {
    color: "primary",
    width: "100%"
  },
  inputInput: {
    paddingTop: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
    paddingLeft: theme.spacing.unit * 10,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("lg")]: {
      width: 490
    }
  },
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex"
    }
  },
  sectionMobile: {
    display: "flex",
    [theme.breakpoints.up("md")]: {
      display: "none"
    }
  },

  customWidth: {
    maxWidth: 500
  }
});

class Header extends React.Component {
  state = {
    anchorEl: null,
    mobileMoreAnchorEl: null
  };

  handleProfileMenuOpen = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleMenuClose = () => {
    this.setState({ anchorEl: null });
    this.handleMobileMenuClose();
  };

  handleMobileMenuOpen = event => {
    this.setState({ mobileMoreAnchorEl: event.currentTarget });
  };

  handleMobileMenuClose = () => {
    this.setState({ mobileMoreAnchorEl: null });
  };

  render() {
    const { anchorEl, mobileMoreAnchorEl } = this.state;
    const { classes } = this.props;
    const isMenuOpen = Boolean(anchorEl);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

    //const { isAuthenticated, user } = this.props.auth;

    const renderMenu = (
      <Menu
        anchorEl={anchorEl}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        open={isMenuOpen}
        onClose={this.handleMenuClose}
      >
        <Link to="/settings" className={classes.link}>
          <MenuItem onClick={this.handleMenuClose}>Settings</MenuItem>
        </Link>

        <MenuItem onClick={this.props.logout}>Logout</MenuItem>
      </Menu>
    );

    const renderMobileMenu = (
      <Menu
        anchorEl={mobileMoreAnchorEl}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        open={isMobileMenuOpen}
        onClose={this.handleMenuClose}
      >
        <Link to="/" className={classes.linkMobile}>
          <MenuItem>
            <IconButton color="inherit">
              <PollIcon />
            </IconButton>
            <p>Analytics</p>
          </MenuItem>
        </Link>

        <Link to="/clients" className={classes.linkMobile}>
          <MenuItem>
            <IconButton color="inherit">
              <GroupIcon />
            </IconButton>
            <p>Clients</p>
          </MenuItem>
        </Link>

        <Link to="/house-maids" className={classes.linkMobile}>
          <MenuItem>
            <IconButton color="inherit">
              <GroupIcon />
            </IconButton>
            <p>House Maids</p>
          </MenuItem>
        </Link>
      </Menu>
    );

    return (
      <div className={classes.root}>
        <AppBar position="fixed" style={{ background: "teal" }}>
          <Toolbar>
            <Avatar
              alt="Remy Sharp"
              src="/static/images/logos/logo.jpeg"
              className={classes.avatar}
            />
            <Typography
              className={classes.title}
              variant="h4"
              color="inherit"
              noWrap
            >
              Menlyn Home Care Agency Manager
            </Typography>

            <div className={classes.grow} />
            <div className={classes.sectionDesktop}>
              <div>
                <Grid container justify="center" alignItems="center">
                  <div style={{ paddingRight: 20 }}>
                    <Link to="/" className={classes.link}>
                      <IconButton color="inherit">
                        <PollIcon />
                      </IconButton>

                      <Typography
                        variant="body2"
                        color="inherit"
                        noWrap
                        style={{ fontWeight: "bold" }}
                      >
                        Analytics
                      </Typography>
                    </Link>
                  </div>
                  <div style={{ paddingRight: 20 }}>
                    <Link to="/clients" className={classes.link}>
                      <IconButton color="inherit">
                        <GroupIcon />
                      </IconButton>

                      <Typography
                        variant="body2"
                        color="inherit"
                        noWrap
                        style={{ fontWeight: "bold" }}
                      >
                        Clients
                      </Typography>
                    </Link>
                  </div>
                  <div style={{ paddingRight: 20 }}>
                    <Link to="/house-maids" className={classes.link}>
                      <IconButton color="inherit">
                        <GroupIcon />
                      </IconButton>
                      <Typography
                        variant="body2"
                        color="inherit"
                        noWrap
                        style={{ fontWeight: "bold" }}
                      >
                        Maids
                      </Typography>
                    </Link>
                  </div>
                </Grid>
              </div>
              {/* 
              <IconButton
                aria-owns={isMenuOpen ? "material-appbar" : undefined}
                aria-haspopup="true"
                onClick={this.handleProfileMenuOpen}
                color="inherit"
              >
                <br />
                <ArrowDropDownIcon />
              </IconButton> */}
              <IconButton color="inherit" onClick={this.handleProfileMenuOpen}>
                <AccountCircle style={{ height: 50, width: 50 }} />
              </IconButton>
            </div>
            <div className={classes.sectionMobile}>
              <IconButton
                aria-haspopup="true"
                onClick={this.handleMobileMenuOpen}
                color="inherit"
              >
                <MoreIcon />
              </IconButton>
            </div>
          </Toolbar>
        </AppBar>
        {renderMenu}
        {renderMobileMenu}
      </div>
    );
  }
}

Header.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Header);
