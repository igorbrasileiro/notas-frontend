import React from 'react';
import SubjectList from './SubjectList';
import { withStyles } from '@material-ui/core';
import PropTypes from 'prop-types';

const styles = theme => ({
  root: {
    [theme.breakpoints.up('sm')]: {
      width: '60%',
    },
    [theme.breakpoints.down('sm')]: {
      width: '90%',
    },
  },
  child: {
    width: '100%',
    minWidth: '100%',
  },
});

const UserInfo = ({ classes }) => (
  <div className={classes.root}>
    <SubjectList />
  </div>
);

UserInfo.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(UserInfo);
