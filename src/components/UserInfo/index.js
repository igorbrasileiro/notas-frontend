import React from 'react';
import PropTypes from 'prop-types';
import SubjectList from './SubjectList';
import { withStyles } from '@material-ui/core';
import CreateSubjectCard from './CreateSubjectCard';

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
    <CreateSubjectCard />
    <SubjectList />
  </div>
);

UserInfo.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(UserInfo);
