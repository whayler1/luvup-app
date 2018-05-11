import React, { Component } from 'react';
import superagent from 'superagent';
import _ from 'lodash';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import config from '../../config.js';
import Template from './ConfirmUserRequestCode.template';
import { emailRegex } from '../../helpers';
import {
  confirmUserRequestCode as confirmUserRequestCodeAction,
} from '../../redux/user/user.actions';

class ConfirmUserRequestCode extends Component {
  static propTypes = {
    email: PropTypes.string,
    confirmUserRequestCode: PropTypes.func,
  };

  state = {
    email: this.props.email || '',
    code: '',
    error: '',
    focusInput: '',
  };

  onEmailFocus = () => this.setState({ focusInput: 'email' });
  onCodeFocus = () => this.setState({ focusInput: 'code' });
  onEmailChange = email => this.setState({ email });
  onCodeChange = code => this.setState({ code });
  onBlur = () => this.setState({ focusInput: '' });

  getValidationError = () => {
    const { email, code, } = this.state;
    if (!emailRegex.test(email)) {
      return 'email';
    }
    if (!code) {
      return 'code';
    }
    if (String(code).length < 6) {
      return 'code-length';
    }
    return '';
  }

  onSubmitSuccess = () => {
    
    Actions.confirmUserRequestCreateProfile();
  }

  submit = async () => {
    
    const { email, code } = this.state;
    const res = await this.props.confirmUserRequestCode(email, code);

    const confirmUserRequestCode = _.at(res, 'body.data.confirmUserRequestCode')[0];

    if (confirmUserRequestCode) {
      if (confirmUserRequestCode.error && confirmUserRequestCode.error.length) {
        this.setState({
          isInFlight: false,
          error: confirmUserRequestCode.error,
        });
      } else {
        this.setState({
          isInFlight: false,
          error: '',
        }, this.onSubmitSuccess);
      }
    } else {
      this.setState({
        isInFlight: false,
        error: 'server',
      });
    }
  }

  onSubmit = () => {
    const errorStr = this.getValidationError();
    
    if (errorStr.length) {
      this.setState({ error: errorStr });
      return;
    }
    this.setState({ error: '', isInFlight: true }, this.submit);
  };

  render() {
    return <Template
      {..._.pick(this,
        'onEmailFocus',
        'onCodeFocus',
        'onEmailChange',
        'onCodeChange',
        'onBlur',
        'onSubmit',
      )}
      {...this.state}
    />;
  };
};

export default connect(
  state => ({
    email: state.user.email
  }),
  {
    confirmUserRequestCode: confirmUserRequestCodeAction,
  }
)(ConfirmUserRequestCode);
