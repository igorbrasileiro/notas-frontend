import PropTypes from "prop-types";
import { connect } from "react-redux";
import React, { Component } from "react";
import { withStyles } from "@material-ui/core";

import ApplicationBar from "./ApplicationBar";
import UserInfo from "../UserInfo";
import { NO_LOGGED_USER } from "../../reducers/user";
import { fetchLoggedUser } from "../../actions/user";
import { fetchUserSubjects } from "../../actions/subject";

const styles = {
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
};

class Home extends Component {
  componentDidMount() {
    const { getLoggedUser, getUserSubjects } = this.props;
    getLoggedUser();
    getUserSubjects();
  }

  render() {
    const { classes, role } = this.props;

    return (
      <div className={classes.wrapper}>
        <ApplicationBar />
        <div className={classes.main}>{role && <UserInfo />}</div>
      </div>
    );
  }
}

Home.propTypes = {
  classes: PropTypes.object.isRequired,
  getLoggedUser: PropTypes.func.isRequired,
  getUserSubjects: PropTypes.func.isRequired,
  role: PropTypes.string.isRequired,
};

function mapStateToProps({ user }) {
  const role =
    user.loggedUserId !== NO_LOGGED_USER
      ? user.byId[user.loggedUserId].role
      : "student";
  return {
    role,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getLoggedUser: () => dispatch(fetchLoggedUser()),
    getUserSubjects: () => dispatch(fetchUserSubjects()), // CHANGE TO USER
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Home));
