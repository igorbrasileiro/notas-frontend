import PropTypes from 'prop-types';
import UserInfo from '../UserInfo';
import { connect } from 'react-redux';
import styled from 'styled-components';
import React, { Component } from 'react';
import ApplicationBar from './ApplicationBar';
import { withStyles } from '@material-ui/core';
import { fetchLoggedUser } from '../../actions/user';

const MainContainer = styled.main`
  align-items: center;
  background-color: inherit;
  display: flex;
  flex-direction: column;
  margin-top: 70px;
  width: 100%;
`;

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

class Home extends Component {
  componentDidMount() {
    const { getLoggedUser } = this.props;
    console.log('cDM');
    getLoggedUser();
  }

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.wrapper}>
        <ApplicationBar />
        {/* TODO HOME ROUTER */}
        <MainContainer>
          <UserInfo />
        </MainContainer>
      </div>
    );
  }
}

Home.propTypes = {
  classes: PropTypes.object.isRequired,
  getLoggedUser: PropTypes.func.isRequired,
};

function mapDispatchToProps(dispatch) {
  return {
    getLoggedUser: () => dispatch(fetchLoggedUser()),
  };
}

export default connect(
  null,
  mapDispatchToProps,
)(withStyles(styles)(Home));
