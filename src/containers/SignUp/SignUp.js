import React, { Component } from 'react';
import superagent from 'superagent';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import config from '../../config.js';
import { emailRegex } from '../../helpers';
import Template from './SignUp.template';
import { userRequest as userRequestAction } from '../../redux/user/user.actions';


class SignUp extends Component {
  static propTypes = {
    userRequest: PropTypes.func.isRequired,
  };

  state = {
    email: '',
    error: '',
    isInFlight: false,
    focusInput: '',
  };

  onEmailFocus = () => this.setState({ focusInput: 'email' });
  onEmailChange = email => this.setState({ email });
  onBlur = () => this.setState({ focusInput: '' });

  getValidationError = () => {
    if (!emailRegex.test(this.state.email)) {
      return 'email';
    }
    return '';
  };

  submit = async () => {
    
    const res = await this.props.userRequest(this.state.email);
    

    if (!('body' in res && 'data' in res.body && 'userRequest' in res.body.data)) {
      this.setState({ error: 'response', isInFlight: false });
    } else {
      const { error } = res.body.data.userRequest;
      if (error) {
        this.setState({ error, isInFlight: false });
      } else {
        this.setState({
          error: '',
          isInFlight: false,
        }, () => Actions.confirmUserRequestCode());
      }
    }
  };

  onSubmit = () => {
    const errorStr = this.getValidationError();
    if (errorStr) {
      this.setState({ error: errorStr });
      return;
    }
    this.setState({ error: errorStr, isInFlight: true }, this.submit);
  };

  render() {
    return <Template
      onEmailFocus={this.onEmailFocus}
      onEmailChange={this.onEmailChange}
      onBlur={this.onBlure}
      onSubmit={this.onSubmit}
      {...this.state}
    />;
  };
};

export default connect(
  null,
  {
    userRequest: userRequestAction,
  }
)(SignUp);
