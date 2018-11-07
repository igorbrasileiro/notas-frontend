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
  CardActions,
  CardContent,
} from '@material-ui/core';

const styles = () => ({
  root: {
    width: '100%',
  },
  avatar: {
    backgroundColor: red[500],
  },
});

class SubjectCard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      editing: false,
    };
  }

  render() {
    const { classes, subject } = this.props;

    return (
      <Card className={classes.root}>
        <CardHeader
          avatar={<Avatar className={classes.avatar}>{subject.name.slice(0, 1)}</Avatar>}
          title={subject.name}
          subheader={subject.date}
        />
        <CardActions className={classes.actions} disableActionSpacing>
          <IconButton
            className={classnames(classes.expand, {
              [classes.expandOpen]: this.state.expanded,
            })}
            onClick={this.handleExpandClick}
            aria-expanded={this.state.expanded}
            aria-label="Show more"
          >
            <ExpandMore />
          </IconButton>
        </CardActions>
          <Collapse in={this.state.expanded} timeout="auto" unmountOnExit>
          <CardContent> UHYDASDHUSASUDHADSAD </CardContent>
          </Collapse>
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
