import React from 'react';
import SubjectCard from './SubjectCard';
import { withStyles } from '@material-ui/core';
import PropTypes from 'prop-types';

const styles = () => ({
  root: {
    maxWidth: '70%',
  },
  child: {
    width: '100%',
    minWidth: '100%',
  },
});

const UserInfo = ({ classes }) => (
  <div className={classes.root}>
    <SubjectCard subject={{ name: 'Mocked Name', date: '10/10/2018' }} />
  </div>
);

UserInfo.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(UserInfo);
