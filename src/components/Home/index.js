import React from 'react';
import PropTypes from 'prop-types';
import UserInfo from '../UserInfo';
import styled from 'styled-components';
import ApplicationBar from './ApplicationBar';
import { withStyles } from '@material-ui/core';

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

const Home = ({ classes }) => (
  <div className={classes.wrapper}>
    <ApplicationBar />
    {/* TODO HOME ROUTER */}
    <MainContainer>
      <UserInfo />
    </MainContainer>
  </div>
);

Home.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Home);
