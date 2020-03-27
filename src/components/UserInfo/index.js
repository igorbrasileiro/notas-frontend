import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core";

import TeacherCards from "./TeacherCards";
import StudentCards from "./StudentCards";

const styles = (theme) => ({
  root: {
    margin: "0 auto",
    [theme.breakpoints.up("sm")]: {
      width: "60%",
    },
    [theme.breakpoints.down("sm")]: {
      width: "90%",
    },
  },
  child: {
    width: "100%",
    minWidth: "100%",
  },
});

const UserInfo = ({ classes, role }) => (
  <div className={classes.root}>
    {role === "student" ? <StudentCards /> : <TeacherCards />}
  </div>
);

UserInfo.propTypes = {
  classes: PropTypes.object.isRequired,
  role: PropTypes.string.isRequired,
};

function mapStateToProps({ user }) {
  return {
    role: user?.byId[user?.loggedUserId]?.role,
  };
}

export default connect(mapStateToProps)(withStyles(styles)(UserInfo));
