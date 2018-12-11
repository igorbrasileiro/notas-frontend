import PropTypes from 'prop-types';
import classnames from 'classnames';
import { connect } from 'react-redux';
import React, { Component } from 'react';
import red from '@material-ui/core/colors/red';
import { deleteStudentSubject } from '../../actions/subject';
import { ExpandMore, DeleteForever } from '@material-ui/icons';
import {
  Card,
  Avatar,
  Collapse,
  IconButton,
  CardHeader,
  withStyles,
  CardContent,
  TextField,
  CardActions,
} from '@material-ui/core';

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 2,
  },
  avatar: {
    backgroundColor: red[500],
  },
  expand: {
    marginTop: theme.spacing.unit,
    transform: 'rotate(0deg)',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
    marginLeft: 'auto',
    [theme.breakpoints.up('sm')]: {
      marginRight: 0,
    },
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  row: {
    display: 'flex',
    justifyContent: 'flex-start',
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
    },
    [theme.breakpoints.up('sm')]: {
      flexDirection: 'row',
    },
  },
  grade: {
    width: '100%',
    '&:not(:last-child)': {
      marginRight: theme.spacing.unit,
    },
  },
});

const SubjectContent = ({ classes, expanded, onHandleRemove, subject }) => (
  <Collapse in={expanded} timeout="auto" unmountOnExit>
    <CardContent>
      <div className={classes.row}>
        <TextField
          label="Sua identificação"
          value={subject.studentIdentification}
          margin="normal"
          variant="outlined"
          className={classes.grade}
        />
        <TextField
          label="Coluna de Identificação"
          value={subject.studentIdentificationColumn}
          margin="normal"
          variant="outlined"
          className={classes.grade}
        />
      </div>
      <div className={classes.row}>
        <TextField
          label="Colunas de notas"
          value={subject.gradeColumns}
          margin="normal"
          variant="outlined"
          fullWidth
        />
      </div>
      <div className={classes.row}>
        {subject.grades &&
          subject.grades.map(grade => (
            <TextField
              key={grade}
              label="Nota"
              value={grade}
              margin="normal"
              variant="outlined"
              className={classes.grade}
              fullWidth
            />
          ))}
      </div>
    </CardContent>
    <CardActions>
      <IconButton onClick={() => onHandleRemove(subject._id)}>
        <DeleteForever />
      </IconButton>
    </CardActions>
  </Collapse>
);

SubjectContent.propTypes = {
  classes: PropTypes.object.isRequired,
  expanded: PropTypes.bool.isRequired,
  onHandleRemove: PropTypes.func.isRequired,
  subject: PropTypes.object.isRequired,
};

const ExpandButtonCard = ({ classes, onClick, expanded }) => (
  <IconButton
    className={classnames(classes.expand, {
      [classes.expandOpen]: expanded,
    })}
    onClick={onClick}
    aria-expanded={expanded}
    aria-label="Show more"
  >
    <ExpandMore />
  </IconButton>
);

ExpandButtonCard.propTypes = {
  classes: PropTypes.object.isRequired,
  expanded: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
};

class SubjectCard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      // editing: false,
      expanded: false,
    };

    this.handleExpandClick = this.handleExpandClick.bind(this);
  }

  handleExpandClick() {
    this.setState(prevState => ({ expanded: !prevState.expanded }));
  }

  render() {
    const { classes, subject, removeStudentSubject } = this.props;
    const { expanded } = this.state;

    return (
      <Card className={classes.root}>
        <CardHeader
          avatar={<Avatar className={classes.avatar}>{subject.subject.name.slice(0, 1)}</Avatar>}
          title={subject.subject.name}
          subheader={subject.subject.createdAt.slice(0, 10)}
          action={
            <ExpandButtonCard
              expanded={expanded}
              classes={classes}
              onClick={this.handleExpandClick}
            />
          }
        />
        <SubjectContent
          classes={classes}
          expanded={expanded}
          subject={subject}
          onHandleRemove={removeStudentSubject}
        />
      </Card>
    );
  }
}

SubjectCard.propTypes = {
  classes: PropTypes.object.isRequired,
  removeStudentSubject: PropTypes.func.isRequired,
  subject: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    gradeColumns: PropTypes.string.isRequired,
    grades: PropTypes.array,
    studentIdentification: PropTypes.string.isRequired,
    studentIdentificationColumn: PropTypes.string.isRequired,
    subject: PropTypes.shape({
      _id: PropTypes.string.isRequired,
      createdAt: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

function mapDispatchToProps(dispatch) {
  return {
    removeStudentSubject: id => dispatch(deleteStudentSubject(id)),
  };
}

export default connect(
  null,
  mapDispatchToProps,
)(withStyles(styles)(SubjectCard));
