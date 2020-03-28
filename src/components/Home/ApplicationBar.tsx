import React, { FC, useState, SyntheticEvent } from "react";
import { AccountCircle } from "@material-ui/icons";
import {
  AppBar,
  IconButton,
  Toolbar,
  Typography,
  makeStyles,
  Theme,
} from "@material-ui/core";

import UserMenu from "./UserMenu";

const USER_MENU_ID = "appbar__user-menu";

const useStyles = makeStyles((theme: Theme) => ({
  appTitle: {
    color: theme.palette.common.white,
    flex: 1,
  },
  userIcon: {
    color: theme.palette.common.white,
  },
  selectRoot: {
    color: theme.palette.common.white,
    [theme.breakpoints.up("sm")]: {
      maxWidth: 250,
    },
    [theme.breakpoints.down("sm")]: {
      maxWidth: 200,
    },
    [theme.breakpoints.down("xs")]: {
      maxWidth: 110,
    },
  },
}));

const ApplicationBar: FC = () => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>();

  const handleOpenUserMenu = (event: SyntheticEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  return (
    <AppBar position="fixed">
      <Toolbar>
        <Typography
          className={classes.appTitle}
          variant="h6"
          color="textSecondary"
        >
          APP Notas
        </Typography>
        <IconButton
          aria-owns={open ? USER_MENU_ID : undefined}
          aria-haspopup="true"
          color="inherit"
          onClick={handleOpenUserMenu}
        >
          <AccountCircle className={classes.userIcon} />
        </IconButton>
        <UserMenu
          anchorEl={anchorEl}
          menuId={USER_MENU_ID}
          onClose={handleCloseUserMenu}
        />
      </Toolbar>
    </AppBar>
  );
};

export default ApplicationBar;
