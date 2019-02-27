import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';

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
    username: PropTypes.string,
    isReset: PropTypes.bool.isRequired,
    login: PropTypes.func.isRequired,
    getMe: PropTypes.func.isRequired,
    getMeErrorMessage: PropTypes.string.isRequired,
    relationshipId: PropTypes.string,
    loverRequestId: PropTypes.string,
  };

  static defaultProps = {
    username: '',
  };

  constructor(props) {
    super(props);

    this.state = {
      username: props.username,
      password: '',
      error: '',
      isInFlight: false,
      focus: '',
    };
  }

  handleUsernameFocus = () => this.setState({ focus: 'username' });
  handlePasswordFocus = () => this.setState({ focus: 'password' });
  handleUsernameChange = username => this.setState({ username });
  handlePasswordChange = password => this.setState({ password });
  handleBlur = () => this.setState({ focus: '' });

  getValidationError = () => {
    const { username, password } = this.state;
    if (!username) {
      return 'username';
    }
    if (!password) {
      return 'password';
    }
    return '';
  };

  navigateToSignUp = () => Actions.signup();
  navigateToSignUpConfirm = () => Actions.confirmUserRequestCode();
  navigateToForgotPassword = () => Actions.forgotPassword();

  submit = async () => {
    const { username, password } = this.state;
    await this.props.login(username, password);

    if (this.props.isReset) {
      Actions.resetPasswordWithGeneratedPassword({
        generatedPassword: password,
      });
    } else if (this.props.userId) {
      registerForPushNotifications();
      userLoginRouteSwitch();
    } else {
      this.setState({
        error: 'server',
        isInFlight: false,
      });
    }
  };

  handleSubmit = () => {
    const errorStr = this.getValidationError();
    this.setState({ error: errorStr });
    if (errorStr) {
      return;
    }
    this.setState({ isInFlight: true }, this.submit);
  };

  render() {
    return (
      <Template
        {...this.state}
        navigateToSignUpConfirm={this.navigateToSignUpConfirm}
        navigateToSignUp={this.navigateToSignUp}
        navigateToForgotPassword={this.navigateToForgotPassword}
        onSubmit={this.handleSubmit}
        onUsernameFocus={this.handleUsernameFocus}
        onPasswordFocus={this.handlePasswordFocus}
        onUsernameChange={this.handleUsernameChange}
        onPasswordChange={this.handlePasswordChange}
        onBlur={this.handleBlur}
        getMeErrorMessage={this.props.getMeErrorMessage}
      />
    );
  }
}

export default connect(
  state => ({
    userId: state.user.id,
    isReset: state.user.isReset,
    relationshipId: state.relationship.id,
    loverRequestId: state.loverRequest.id,
    getMeErrorMessage: state.user.getMeErrorMessage,
  }),
  {
    login: loginAction,
    getMe: getMeAction,
  }
)(Login);
