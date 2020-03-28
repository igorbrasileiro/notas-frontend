import React from "react";
import { useSelector } from "react-redux";
import { makeStyles, Theme } from "@material-ui/core";

import TeacherCards from "./TeacherCards";
import StudentCards from "./StudentCards";
import { UserReduceState } from "../../reducers/userInterfaces";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    margin: "0 auto",
    [theme.breakpoints.up("sm")]: {
      width: "60%",
    },
    [theme.breakpoints.down("sm")]: {
      width: "90%",
    },
  },
}));

const UserInfo = () => {
  const { byId, loggedUserId } = useSelector(
    ({ user }: { user: UserReduceState }): UserReduceState => user
  );
  const classes = useStyles();
  const role = byId[loggedUserId]?.role;

  return (
    <div className={classes.root}>
      {role === "student" ? <StudentCards /> : <TeacherCards />}
    </div>
  );
};

export default UserInfo;
