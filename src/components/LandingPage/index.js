import PropTypes from "prop-types";
import React, { Component } from "react";
import { withStyles } from "@material-ui/core";

import SignUp from "./SignUp";
import SignIn from "./SignIn";

const styles = (theme) => ({
  root: {
    alignItems: "center",
    display: "flex",
    height: `calc(100vh - ${theme.spacing(2)}px)`,
    justifyContent: "center",
    overflow: "hidden",
    padding: theme.spacing(1),
    position: "relative",
  },
});

class LandingPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      openSignIn: false,
    };

    this.handleCloseSignIn = this.handleCloseSignIn.bind(this);
    this.handleOpenSignIn = this.handleOpenSignIn.bind(this);
  }

  handleCloseSignIn() {
    this.setState({ openSignIn: false });
  }

  handleOpenSignIn() {
    this.setState({ openSignIn: true });
  }

  render() {
    const { openSignIn } = this.state;
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <SignUp onHandleSignIn={this.handleOpenSignIn} />
        <SignIn open={openSignIn} onClose={this.handleCloseSignIn} />
      </div>
    );
  }
}

LandingPage.propTypes = {
  classes: PropTypes.object,
};

export default withStyles(styles)(LandingPage);
