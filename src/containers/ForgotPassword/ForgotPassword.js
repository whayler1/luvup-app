import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { View, KeyboardAvoidingView, Text } from 'react-native';

import styles from './ForgotPassword.styles';
import { modal, scene } from '../../styles';
import { sendNewPassword as sendNewPasswordAction } from '../../redux/user/user.actions';

class ForgotPassword extends PureComponent {
  static propTypes = {
    isSendNewPasswordInFlight: PropTypes.bool.isRequired,
    sendNewPasswordError: PropTypes.string.isRequired,
    sendNewPassword: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      email: '',
    };
  }

  handleEmailChange = email => {
    this.setState({ email });
  };

  handleSubmit = () => {
    this.props.sendNewPassword(this.state.email);
  };

  render() {
    return (
      <KeyboardAvoidingView>
        <View style={scene.contentNoTop}>
          <Text style={modal.title}>Request Password Reset</Text>
          <Text style={[modal.copy, styles.copy]}>
            Enter your email address below and you will be emailed a temporary
            password.
          </Text>
        </View>
      </KeyboardAvoidingView>
    );
  }
}

export default connect(
  state => ({
    isSendNewPasswordInFlight: state.user.isSendNewPasswordInFlight,
    sendNewPasswordError: state.user.sendNewPasswordError,
  }),
  {
    sendNewPassword: sendNewPasswordAction,
  }
)(ForgotPassword);
