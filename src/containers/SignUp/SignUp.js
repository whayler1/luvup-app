import React, { PureComponent } from 'react';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { emailRegex } from '../../helpers';
import Template from './SignUp.template';
import { userRequest as userRequestAction } from '../../redux/user/user.actions';

class SignUp extends PureComponent {
  static propTypes = {
    userRequest: PropTypes.func.isRequired,
    isUserRequestInFlight: PropTypes.bool.isRequired,
    userRequestError: PropTypes.string.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      email: '',
      error: '',
      focusInput: '',
    };
  }

  componentDidUpdate(prevProps) {
    if (
      prevProps.isUserRequestInFlight &&
      !this.props.isUserRequestInFlight &&
      !this.props.userRequestError
    ) {
      Actions.confirmUserRequestCode();
    }
  }

  handleEmailFocus = () => this.setState({ focusInput: 'email' });
  handleEmailChange = email => this.setState({ email });
  handleBlur = () => this.setState({ focusInput: '' });

  getValidationError = () => {
    if (!emailRegex.test(this.state.email)) {
      return 'email';
    }
    return '';
  };

  submit() {
    this.props.userRequest(this.state.email);
  }

  handleSubmit = () => {
    const error = this.getValidationError();
    if (error) {
      this.setState({ error });
      return;
    }
    this.setState({ error: '' }, this.submit);
  };

  render() {
    return (
      <Template
        onEmailFocus={this.handleEmailFocus}
        onEmailChange={this.handleEmailChange}
        onBlur={this.handleBlur}
        onSubmit={this.handleSubmit}
        error={this.props.userRequestError || this.state.error}
        isInFlight={this.props.isUserRequestInFlight}
        email={this.state.email}
        focusInput={this.state.focusInput}
      />
    );
  }
}

export default connect(
  state => ({
    isUserRequestInFlight: state.user.isUserRequestInFlight,
    userRequestError: state.user.userRequestError,
  }),
  {
    userRequest: userRequestAction,
  }
)(SignUp);
