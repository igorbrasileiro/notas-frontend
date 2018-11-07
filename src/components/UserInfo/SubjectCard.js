import PropTypes from 'prop-types';
import classnames from 'classnames';
import React, { Component } from 'react';
import red from '@material-ui/core/colors/red';
import { ExpandMore } from '@material-ui/icons';
import {
  Card,
  Avatar,
  Collapse,
  IconButton,
  CardHeader,
  withStyles,
  CardContent,
} from '@material-ui/core';

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 2,
  },
  actions: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  avatar: {
    backgroundColor: red[500],
  },
  expand: {
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
});

const SubjectContent = ({ expanded }) => (
  <Collapse in={expanded} timeout="auto" unmountOnExit>
    <CardContent> UHYDASDHUSASUDHADSAD </CardContent>
  </Collapse>
);

SubjectContent.propTypes = {
  expanded: PropTypes.bool.isRequired,
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
    const { classes, subject } = this.props;
    const { expanded } = this.state;

    return (
      <Card className={classes.root}>
        <CardHeader
          avatar={<Avatar className={classes.avatar}>{subject.name.slice(0, 1)}</Avatar>}
          title={subject.name}
          subheader={subject.date}
          action={
            <ExpandButtonCard
              expanded={expanded}
              classes={classes}
              onClick={this.handleExpandClick}
            />
          }
        />
        <SubjectContent expanded={expanded} />
      </Card>
    );
  }
}

SubjectCard.propTypes = {
  classes: PropTypes.object.isRequired,
  subject: PropTypes.shape({
    date: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired,
};

export default withStyles(styles)(SubjectCard);
