import React, { Component } from 'react';
import _ from 'lodash';

import Template from './SignUpConfirm.template';

export default class SignUpConfirm extends Component {
  state = {
    email: '',
    username: '',
    password: '',
    passwordAgain: '',
    error: '',
  };

  onEmailChange = email => this.setState({ email });
  onUsernameChange = username => this.setState({ username });
  onPasswordChange = password => this.setState({ password });
  onPasswordAgainChange = passwordAgain => this.setState({ passwordAgain });

  onSubmit = () => {

  };

  render() {
    return <Template
      {...Object.assign(_.pick(this,
        'onEmailChange',
        'onUsernameChange',
        'onPasswordChange',
        'onPasswordAgainChange',
        'onSubmit',
      ),
        ...this.state
      )}
    />;
  };
};
