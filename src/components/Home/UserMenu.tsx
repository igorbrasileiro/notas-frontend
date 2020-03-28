import { connect } from "react-redux";
import { withRouter, RouteComponentProps } from "react-router-dom";
import React, { Component, Fragment } from "react";
import {
  Menu,
  MenuItem,
  withStyles,
  createStyles,
  PopoverProps,
} from "@material-ui/core";

import { clearStore } from "../../actions";
import { ComponentWithClasses } from "../utils/classes";

interface UserMenuProps extends ComponentWithClasses, RouteComponentProps {
  anchorEl: PopoverProps["anchorEl"];
  menuId: string;
  onClose: () => void;
  resetStore: () => void;
}

const styles = createStyles({
  userMenu: {
    minWidth: 200,
  },
});

class UserMenu extends Component<UserMenuProps> {
  constructor(props: UserMenuProps) {
    super(props);

    this.handleLogout = this.handleLogout.bind(this);
    this.goToRoute = this.goToRoute.bind(this);
  }

  private handleLogout() {
    const { resetStore, onClose } = this.props;
    localStorage.removeItem("token");
    resetStore();
    onClose();
    this.goToRoute("/landing");
  }

  private goToRoute(path = "/") {
    this.props.history.push(path);
    this.props.onClose();
  }

  public render() {
    const { anchorEl, classes, menuId, onClose } = this.props;
    const open = Boolean(anchorEl);

    return (
      <Fragment>
        <Menu
          id={menuId}
          classes={{ paper: classes.userMenu }}
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
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

function mapDispatchToProps(dispatch: any) {
  return {
    resetStore: () => clearStore(dispatch),
  };
}

export default connect(
  null,
  mapDispatchToProps
)(withStyles(styles)(withRouter(UserMenu)));
