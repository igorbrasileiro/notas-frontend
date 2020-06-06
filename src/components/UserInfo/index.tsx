import React from "react";
import { loader } from "graphql.macro";
import { useQuery } from "@apollo/react-hooks";
import { makeStyles, Theme, CircularProgress } from "@material-ui/core";

import TeacherCards from "./TeacherCards";
import StudentCards from "./StudentCards";

const USER_PROFILE = loader("../../graphql/user/UserProfile.graphql");

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
  const { data, loading } = useQuery(USER_PROFILE);

  const classes = useStyles();
  const isStudent = data?.userProfile?.role === "STUDENT";

  return (
    <div className={classes.root}>
      {loading ? (
        <CircularProgress />
      ) : isStudent ? (
        <StudentCards />
      ) : (
        <TeacherCards />
      )}
    </div>
  );
};

export default UserInfo;
