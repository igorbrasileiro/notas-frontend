import PropTypes from 'prop-types';
import UserInfo from '../UserInfo';
import { connect } from 'react-redux';
import styled from 'styled-components';
import React, { Component } from 'react';
import ApplicationBar from './ApplicationBar';
import { withStyles } from '@material-ui/core';
import { NO_LOGGED_USER } from '../../reducers/user';
import { fetchLoggedUser } from '../../actions/user';
import { fetchStudentSubjects } from '../../actions/subject';

const MainContainer = styled.main`
  align-items: center;
  background-color: inherit;
  display: flex;
  flex-direction: column;
  margin-top: 70px;
  width: 100%;
`;

const styles = {
  wrapper: {
    alignItens: 'center',
    backgroundColor: 'inherit',
    display: 'flex',
    flex: '1 1 auto',
    flexDirection: 'column',
    width: '100%',
  },
};

class Home extends Component {
  componentDidMount() {
    const { getLoggedUser, getStudentSubject } = this.props;
    getLoggedUser();
    getStudentSubject();
  }

  render() {
    const { classes, role } = this.props;

    return (
      <div className={classes.wrapper}>
        <ApplicationBar />
        <MainContainer>{role && <UserInfo />}</MainContainer>
      </div>
    );
  }
}

Home.propTypes = {
  classes: PropTypes.object.isRequired,
  getLoggedUser: PropTypes.func.isRequired,
  getStudentSubject: PropTypes.func.isRequired,
  role: PropTypes.string.isRequired,
};

function mapStateToProps({ user }) {
  const role = user.loggedUserId !== NO_LOGGED_USER ? user.byId[user.loggedUserId].role : '';
  return {
    role,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getLoggedUser: () => dispatch(fetchLoggedUser()),
    getStudentSubject: () => dispatch(fetchStudentSubjects()),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withStyles(styles)(Home));
