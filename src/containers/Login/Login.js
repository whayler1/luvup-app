import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { AsyncStorage } from 'react-native';
import { connect } from 'react-redux';
import superagent from 'superagent';
import { Actions } from 'react-native-router-flux';

import config from '../../config.js';
import Template from './Login.template';
import {
  login as loginAction,
  getMe as getMeAction,
} from '../../redux/user/user.actions';

class Login extends Component {
  static propTypes = {
    userId: PropTypes.string,
    login: PropTypes.func.isRequired,
    getMe: PropTypes.func.isRequired,
    relationshipId: PropTypes.string,
    loverRequestId: PropTypes.string,
  };

  state = {
    username: '',
    password: '',
    error: '',
    isInFlight: false,
  }

  onUsernameChange = username => this.setState({ username });
  onPasswordChange = password => this.setState({ password });

  getValidationError = () => {
    const { username, password } = this.state;
    if (!username) {
      return 'username';
    }
    if (!password) {
      return 'password';
    }
    return '';
  }

  navigateToSignUp = () => Actions.signup();
  navigateToSignUpConfirm = () => Actions.signupconfirm();

  /**
   * JW: This method is identical to `onReathSuccess` in Root. Find a way to
   * DRY this up.
   */
  onSubmitSuccess = async () => {
    const meRes = await this.props.getMe();

    if (this.props.relationshipId || this.props.loverRequestId) {
      Actions.dashboard();
    } else {
      Actions.createloverrequest();
    }
  };

  submit = async () => {
    const { username, password } = this.state;
    const loginres = await this.props.login(username, password);
    // console.log('loginres', loginres);

    if (this.props.userId) {
      this.onSubmitSuccess();
    } else {
      this.setState({ error: 'server' });
    }
  };

  onSubmit = () => {
    const errorStr = this.getValidationError();
    this.setState({ error: errorStr });
    if (errorStr) {
      return;
    }
    this.setState({ isInFlight: true }, this.submit);
  }

  render() {
    return <Template
      {...this.state}
      navigateToSignUpConfirm={this.navigateToSignUpConfirm}
      navigateToSignUp={this.navigateToSignUp}
      onSubmit={this.onSubmit}
      onUsernameChange={this.onUsernameChange}
      onPasswordChange={this.onPasswordChange}
    />;
  }
};

export default connect(
  state => ({
    userId: state.user.id,
    relationshipId: state.relationship.id,
    loverRequestId: state.loverRequest.id,
  }),
  {
    login: loginAction,
    getMe: getMeAction,
  }
)(Login);
