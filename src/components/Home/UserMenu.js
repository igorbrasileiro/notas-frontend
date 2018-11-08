import PropTypes from 'prop-types';
import { clearStore } from '../../actions';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import React, { Component, Fragment } from 'react';
import { Menu, MenuItem, withStyles } from '@material-ui/core';

const styles = {
  userMenu: {
    minWidth: 200,
  },
};

class UserMenu extends Component {
  constructor(props) {
    super(props);

    this.handleLogout = this.handleLogout.bind(this);
    this.goToRoute = this.goToRoute.bind(this);
  }

  handleLogout() {
    const { resetStore, onClose } = this.props;
    localStorage.removeItem('token');
    resetStore();
    onClose();
    this.goToRoute('/landing');
  }

  goToRoute(path = '/') {
    this.props.history.push(path);
    this.props.onClose();
  }

  render() {
    const { anchorEl, classes, menuId, onClose } = this.props;
    const open = Boolean(anchorEl);

    return (
      <Fragment>
        <Menu
          id={menuId}
          classes={{ paper: classes.userMenu }}
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          open={open}
          onClose={onClose}
        >
          <MenuItem onClick={onClose}>Perfil</MenuItem>
          {/* TODO PERFIL ROUTE */}
          <MenuItem onClick={this.handleLogout}>Sair</MenuItem>
        </Menu>
      </Fragment>
    );
  }
}

UserMenu.propTypes = {
  anchorEl: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
  classes: PropTypes.object.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  menuId: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
  resetStore: PropTypes.func.isRequired,
};

function mapDispatchToProps(dispatch) {
  return {
    resetStore: () => clearStore(dispatch),
  };
}

export default connect(
  null,
  mapDispatchToProps,
)(withStyles(styles)(withRouter(UserMenu)));
