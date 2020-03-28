import { connect } from "react-redux";
import React, { Component } from "react";
import { withStyles, createStyles } from "@material-ui/core";

import ApplicationBar from "./ApplicationBar";
import UserInfo from "../UserInfo";
import { fetchLoggedUser } from "../../actions/user";
import { fetchUserSubjects } from "../../actions/subject";
import { NO_LOGGED_USER } from "../../reducers/user";
import { UserReduceState } from "../../reducers/userInterfaces";
import { ComponentWithClasses } from "../utils/classes";

interface HomeProps extends ComponentWithClasses {
  role: string;
  getLoggedUser: () => void;
  getUserSubjects: () => void;
}

const styles = createStyles({
  main: {
    alignItens: "center",
    backgroundColor: "inherit",
    display: "flex",
    flexDirection: "column",
    marginTop: "70px",
    width: "100%",
  },
  wrapper: {
    alignItens: "center",
    backgroundColor: "inherit",
    display: "flex",
    flex: "1 1 auto",
    flexDirection: "column",
    width: "100%",
  },
});

class Home extends Component<HomeProps> {
  public componentDidMount() {
    const { getLoggedUser, getUserSubjects } = this.props;
    getLoggedUser();
    getUserSubjects();
  }

  public render() {
    const { classes, role } = this.props;

    return (
      <div className={classes.wrapper}>
        <ApplicationBar />
        <div className={classes.main}>{role && <UserInfo />}</div>
      </div>
    );
  }
}

function mapStateToProps({ user }: { user: UserReduceState }) {
  const role =
    user.loggedUserId !== NO_LOGGED_USER
      ? user.byId[user.loggedUserId].role
      : "student";
  return {
    role,
  };
}

function mapDispatchToProps(dispatch: any) {
  return {
    getLoggedUser: () => dispatch(fetchLoggedUser()),
    getUserSubjects: () => dispatch(fetchUserSubjects()), // CHANGE TO USER
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Home));
