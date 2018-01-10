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
  };

  onEmailChange = email => this.setState({ email });

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
    }
    const { error } = res.body.data.userRequest;
    if (error) {
      this.setState({ error, isInFlight: false });
    } else {
      this.setState({
        error: '',
        isInFlight: false,
      }, () => Actions.signupconfirm());
    }

    // try {
    //   const { email } = this.state;
    //   const res = await superagent.post(config.graphQlUrl, {
    //     query: `mutation {
    //       userRequest( email: "${email}") {
    //         email error
    //       }
    //     }`
    //   });
    //
    //   console.log('res!', res.body);
    //
    //   if (!('body' in res && 'data' in res.body && 'userRequest' in res.body.data)) {
    //     this.setState({ error: 'response', isInFlight: false });
    //   }
    //   const { error } = res.body.data.userRequest;
    //   if (error) {
    //     this.setState({ error, isInFlight: false });
    //   } else {
    //     this.setState({
    //       error: '',
    //       isInFlight: false,
    //     }, () => Actions.signupconfirm());
    //   }
    // } catch (err) {
    //   console.log('err :(', err);
    //   this.setState({ error: 'response', isInFlight: false });
    // }
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
      onEmailChange={this.onEmailChange}
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
