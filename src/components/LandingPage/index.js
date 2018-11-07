import SignUp from './SignUp';
import SignIn from './SignIn';
import PropTypes from 'prop-types';
import theme from '../utils/theme';
import styled from 'styled-components';
import React, { Component } from 'react';

const LandingContainer = styled.div`
  align-items: center;
  display: flex;
  height: calc(100vh - ${({ unit }) => unit * 2}px);
  justify-content: center;
  overflow: hidden;
  padding: ${({ unit }) => unit}px;
  position: relative;
  width: calc(100% - ${({ unit }) => unit * 2}px);
`;

LandingContainer.propTypes = {
  unit: PropTypes.number,
};

LandingContainer.defaultProps = {
  unit: theme.spacing.unit,
};

class LandingPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      openSignIn: false,
    };

    this.handleCloseSignIn = this.handleCloseSignIn.bind(this);
    this.handleOpenSignIn = this.handleOpenSignIn.bind(this);
  }

  handleCloseSignIn() {
    this.setState({ openSignIn: false });
  }

  handleOpenSignIn() {
    this.setState({ openSignIn: true });
  }

  render() {
    const { openSignIn } = this.state;

    return (
      <LandingContainer>
        <SignUp onHandleSignIn={this.handleOpenSignIn} />
        <SignIn open={openSignIn} onClose={this.handleCloseSignIn} />
      </LandingContainer>
    );
  }
}

export default LandingPage;
