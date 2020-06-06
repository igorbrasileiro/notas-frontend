import React from "react";
import { withStyles, createStyles } from "@material-ui/core";

import ApplicationBar from "./ApplicationBar";
import UserInfo from "../UserInfo";
import { ComponentWithClasses } from "../utils/classes";

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
    display: "flex",
    flexDirection: "column",
    width: "100%",
  },
});

function Home({ classes }: ComponentWithClasses) {
  return (
    <div className={classes.wrapper}>
      <ApplicationBar />
      <div className={classes.main}>
        <UserInfo />
      </div>
    </div>
  );
}

export default withStyles(styles)(Home);
