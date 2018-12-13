import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import React from 'react';
import red from '@material-ui/core/colors/red';
import { DeleteForever } from '@material-ui/icons';
import { deleteTeacherSubject } from '../../../actions/subject';
import { Card, Avatar, IconButton, CardHeader, withStyles } from '@material-ui/core';

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 2,
  },
  avatar: {
    backgroundColor: red[500],
  },
  removeBtn: {
    marginTop: theme.spacing.unit,
    marginLeft: 'auto',
    [theme.breakpoints.up('sm')]: {
      marginRight: 0,
    },
  },
});

const RemoveSubjectButton = ({ classes, onHandleRemove }) => (
  <IconButton className={classes.removeBtn} onClick={onHandleRemove}>
    <DeleteForever />
  </IconButton>
);

RemoveSubjectButton.propTypes = {
  classes: PropTypes.object.isRequired,
  onHandleRemove: PropTypes.func.isRequired,
};

const TeacherSubjectCard = ({ classes, removeTeacherSubject, subject }) => (
  <Card className={classes.root}>
    <CardHeader
      avatar={<Avatar className={classes.avatar}>{subject.name.slice(0, 1)}</Avatar>}
      title={subject.name}
      subheader={'Sheet ID: '.concat(subject.spreadsheetId)}
      action={
        <RemoveSubjectButton
          classes={classes}
          onHandleRemove={() => removeTeacherSubject(subject._id)}
        />
      }
    />
  </Card>
);

TeacherSubjectCard.propTypes = {
  classes: PropTypes.object.isRequired,
  removeTeacherSubject: PropTypes.func.isRequired,
  subject: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    spreadsheetId: PropTypes.string.isRequired,
  }).isRequired,
};

function mapDispatchToProps(dispatch) {
  return {
    removeTeacherSubject: id => dispatch(deleteTeacherSubject(id)),
  };
}

export default connect(
  null,
  mapDispatchToProps,
)(withStyles(styles)(TeacherSubjectCard));
