import React from 'react';
import SubjectList from './SubjectList';
import { withStyles } from '@material-ui/core';
import PropTypes from 'prop-types';

const styles = () => ({
  root: {
    width: '60%',
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
