import React, { Component } from 'react';
import superagent from 'superagent';
import _ from 'lodash';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import config from '../../config.js';
import Template from './ConfirmUserRequestCode.template';
import { emailRegex } from '../../helpers';

class ConfirmUserRequestCode extends Component {
  static propTypes = {
    email: PropTypes.string,
  };

  state = {
    email: this.props.email || '',
    code: '',
    error: '',
  };

  onEmailChange = email => this.setState({ email });
  onCodeChange = code => this.setState({ code });

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
    console.log('success boo');
  }

  submit = async () => {
    const { email, code } = this.state;

    try {
      const res = await superagent.post(config.graphQlUrl, {
        query: `mutation {
          confirmUserRequestCode (
            email: "${email}"
            code: "${code}"
          ) {
            success error
          }
        }`,
      });

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
    } catch (err) {
      this.setState({
        isInFlight: false,
        error: 'server',
      });
    }
  }

  onSubmit = () => {
    const errorStr = this.getValidationError();
    console.log('errorStr', errorStr);
    if (errorStr.length) {
      this.setState({ error: errorStr });
      return;
    }
    this.setState({ error: '', isInFlight: true }, this.submit);
  };

  render() {
    return <Template
      {..._.pick(this,
        'onEmailChange',
        'onCodeChange',
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
  }
)(ConfirmUserRequestCode);
