import React from 'react';
import PropTypes from 'prop-types';
import ApplicationBar from './ApplicationBar';
import { withStyles } from '@material-ui/core';

const styles = () => ({
  wrapper: {
    alignItens: 'center',
    backgroundColor: 'inherit',
    display: 'flex',
    flex: '1 1 auto',
    flexDirection: 'column',
    width: '100%',
  },
});

const Home = ({ classes }) => (
  <div className={classes.wrapper}>
    <ApplicationBar />
    {/* TODO HOME ROUTER */}
  </div>
);

Home.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Home);
