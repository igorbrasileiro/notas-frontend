import UserMenu from './UserMenu';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { AccountCircle } from '@material-ui/icons';
import { AppBar, IconButton, Toolbar, Typography, withStyles } from '@material-ui/core';

const USER_MENU_ID = 'appbar__user-menu';

const styles = theme => ({
  appTitle: {
    color: theme.palette.common.white,
    flex: 1,
  },
  userIcon: {
    color: theme.palette.common.white,
  },
  selectRoot: {
    color: theme.palette.common.white,
    [theme.breakpoints.up('sm')]: {
      maxWidth: 250,
    },
    [theme.breakpoints.down('sm')]: {
      maxWidth: 200,
    },
    [theme.breakpoints.down('xs')]: {
      maxWidth: 110,
    },
  },
});

class ApplicationBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      anchorEl: null,
    };
  }

  handleOpenUserMenu = event => {
    console.log('entrei');
    this.setState({ anchorEl: event.currentTarget });
  };

  handleCloseUserMenu = () => {
    this.setState({ anchorEl: null });
  };

  render() {
    const { classes } = this.props;
    const { anchorEl } = this.state;
    const open = Boolean(anchorEl);
    return (
      <AppBar position="fixed">
        <Toolbar>
          <Typography className={classes.appTitle} variant="h6" color="textSecondary">
            APP Notas
          </Typography>
          <IconButton
            aria-owns={open ? USER_MENU_ID : null}
            aria-haspopup="true"
            color="inherit"
            onClick={this.handleOpenUserMenu}
          >
            <AccountCircle className={classes.userIcon} />
          </IconButton>
          <UserMenu anchorEl={anchorEl} menuId={USER_MENU_ID} onClose={this.handleCloseUserMenu} />
        </Toolbar>
      </AppBar>
    );
  }
}

ApplicationBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ApplicationBar);
