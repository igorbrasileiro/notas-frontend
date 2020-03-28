import React, { Component } from "react";
import { withStyles, createStyles, Theme } from "@material-ui/core";

import SignUp from "./SignUp";
import SignIn from "./SignIn";
import { ComponentWithClasses } from "../utils/classes";

type LandingPageProps = ComponentWithClasses;
interface LandingPageState {
  openSignIn: boolean;
}

const styles = (theme: Theme) =>
  createStyles({
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

class LandingPage extends Component<LandingPageProps, LandingPageState> {
  constructor(props: LandingPageProps) {
    super(props);

    this.state = {
      openSignIn: false,
    };

    this.handleCloseSignIn = this.handleCloseSignIn.bind(this);
    this.handleOpenSignIn = this.handleOpenSignIn.bind(this);
  }

  private handleCloseSignIn() {
    this.setState({ openSignIn: false });
  }

  private handleOpenSignIn() {
    this.setState({ openSignIn: true });
  }

  public render() {
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

export default withStyles(styles)(LandingPage);
