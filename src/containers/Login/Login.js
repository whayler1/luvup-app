import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { AsyncStorage } from 'react-native';
import { connect } from 'react-redux';
import superagent from 'superagent';
import { Actions } from 'react-native-router-flux';

import config from '../../config.js';
import {
  userLoginRouteSwitch,
  registerForPushNotifications,
} from '../../helpers';
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
    focus: '',
  }

  onUsernameFocus = () => this.setState({ focus: 'username' });
  onPasswordFocus = () => this.setState({ focus: 'password' });
  onUsernameChange = username => this.setState({ username });
  onPasswordChange = password => this.setState({ password });
  onBlur = () => this.setState({ focus: '' });

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
  navigateToSignUpConfirm = () => Actions.confirmUserRequestCode();

  submit = async () => {
    const { username, password } = this.state;
    const loginres = await this.props.login(username, password);

    console.log('\n\n', { loginres }, loginres.constructor);
    console.log('this.props.userId', this.props.userId);

    if (this.props.userId) {
      registerForPushNotifications();
      userLoginRouteSwitch();
    } else {
      this.setState({
        error: 'server',
        isInFlight: false,
      });
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
      onUsernameFocus={this.onUsernameFocus}
      onPasswordFocus={this.onPasswordFocus}
      onUsernameChange={this.onUsernameChange}
      onPasswordChange={this.onPasswordChange}
      onBlur={this.onBlur}
    />;
  }
};

export default connect(
  state => {
    console.log('\n\nstate.user', state.user);
    return {
    userId: state.user.id,
    relationshipId: state.relationship.id,
    loverRequestId: state.loverRequest.id,
  }},
  {
    login: loginAction,
    getMe: getMeAction,
  }
)(Login);
