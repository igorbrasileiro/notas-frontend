import React from 'react';
import SubjectCard from './SubjectCard';
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

const mock = [
  { name: 'Mocked Name', date: '10/10/2018', id: '1' },
  { name: 'Mocked Name', date: '10/10/2018', id: '2' },
];

const UserInfo = ({ classes }) => (
  <div className={classes.root}>
    {mock.map(subject => (
      <SubjectCard subject={subject} key={subject.id} />
    ))}
  </div>
);

UserInfo.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(UserInfo);
