import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import superagent from 'superagent';
import _ from 'lodash';

import config from '../../config';
import Template from './ChangePasswordModalContent.template';

class ChangePasswordModalContent extends Component {
  static propTypes = {
    closeModal: PropTypes.func.isRequired,
  };

  state = {
    currentPassword: '',
    newPassword: '',
    newPasswordAgain: '',
    focusInput: '',
    error: '',
    isInFlight: false,
    success: false,
  };

  onCurrentPasswordChange = (currentPassword) =>
    this.setState({ currentPassword });
  onNewPasswordChange = (newPassword) => this.setState({ newPassword });
  onNewPasswordAgainChange = (newPasswordAgain) =>
    this.setState({ newPasswordAgain });

  onCurrentPasswordFocus = () =>
    this.setState({ focusInput: 'currentPassword' });
  onNewPasswordFocus = () => this.setState({ focusInput: 'newPassword' });
  onNewPasswordAgainFocus = () =>
    this.setState({ focusInput: 'newPasswordAgain' });
  onBlur = () => this.setState({ focusInput: '' });

  validate = () => {
    const { currentPassword, newPassword, newPasswordAgain } = this.state;
    let error = '';

    if (!currentPassword) {
      error = 'no-current-password';
    } else if (!newPassword) {
      error = 'no-new-password';
    } else if (newPassword.length < 8) {
      error = 'new-password-short';
    } else if (newPassword !== newPasswordAgain) {
      error = 'password-mismatch';
    }
    return new Promise((resolve) => this.setState({ error }, () => resolve()));
  };

  submit = async () => {
    const { currentPassword, newPassword } = this.state;

    try {
      const res = await superagent.post(config.graphQlUrl, {
        query: `mutation {
          changePassword(
            currentPassword: "${currentPassword}"
            newPassword: "${newPassword}"
          ) {
            success error
          }
        }`,
      });

      const changePassword = _.at(res, 'body.data.changePassword')[0];

      if (changePassword) {
        if (changePassword.success) {
          this.setState({
            isInFlight: false,
            success: true,
          });
        } else {
          this.setState({
            isInFlight: false,
            success: false,
            error: changePassword.error,
          });
        }
      }
    } catch (err) {
      this.setState({
        isInFlight: false,
        error: 'server-error',
      });
    }
  };

  onSubmit = async () => {
    await this.validate();
    if (!this.state.error) {
      this.setState(
        {
          isInFlight: true,
        },
        this.submit,
      );
    }
  };

  render() {
    return (
      <Template
        {...this.props}
        {...this.state}
        onCurrentPasswordChange={this.onCurrentPasswordChange}
        onNewPasswordChange={this.onNewPasswordChange}
        onNewPasswordAgainChange={this.onNewPasswordAgainChange}
        onCurrentPasswordFocus={this.onCurrentPasswordFocus}
        onNewPasswordFocus={this.onNewPasswordFocus}
        onNewPasswordAgainFocus={this.onNewPasswordAgainFocus}
        onBlur={this.onBlur}
        onSubmit={this.onSubmit}
      />
    );
  }
}

export default connect(
  undefined,
  {},
)(ChangePasswordModalContent);
