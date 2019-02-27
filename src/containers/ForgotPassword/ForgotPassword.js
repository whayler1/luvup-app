import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { View, ScrollView, Text } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Button } from 'react-native-elements';

import styles from './ForgotPassword.styles';
import { modal, scene, buttons, forms } from '../../styles';
import { sendNewPassword as sendNewPasswordAction } from '../../redux/user/user.actions';
import { emailRegex } from '../../helpers';
import ForgotPasswordForm from './ForgotPasswordForm';

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
      isSuccess: false,
      validationError: '',
    };
  }

  componentDidUpdate(prevProps) {
    if (
      prevProps.isSendNewPasswordInFlight &&
      !this.props.isSendNewPasswordInFlight &&
      this.props.sendNewPasswordError.length < 1
    ) {
      /* eslint-disable react/no-did-update-set-state */
      this.setState({ isSuccess: true });
      /* eslint-enable react/no-did-update-set-state */
    }
  }

  handleEmailChange = email => {
    this.setState({ email });
  };

  handleSubmit = () => {
    if (!this.validate()) {
      return;
    }
    this.props.sendNewPassword(this.state.email);
  };

  handleGoToLogin = () => {
    Actions.login({ username: this.state.email });
  };

  validate = () => {
    const { email } = this.state;
    if (!emailRegex.test(email)) {
      this.setState({ validationError: 'Please provide a valid email' });
      return false;
    }
    this.setState({ validationError: '' });
    return true;
  };

  render() {
    if (this.state.isSuccess) {
      return (
        <ScrollView>
          <View style={scene.contentNoTop}>
            <Text style={modal.title}>Password Reset Email Sent</Text>
            <Text style={[modal.copy, styles.copy]}>
              An email with a temporary password has been sent to{' '}
              <Text style={styles.copyBold}>{this.state.email}</Text>. After you
              log in with your new password you will be prompted to change it to
              a password of your liking.
            </Text>
            <View style={forms.formGroup}>
              <Button
                testID="forgot-password-login-button"
                onPress={this.handleGoToLogin}
                containerViewStyle={buttons.container}
                buttonStyle={buttons.infoSkeletonButton}
                textStyle={buttons.infoSkeletonText}
                title="Login"
              />
            </View>
          </View>
        </ScrollView>
      );
    }
    const {
      props: {
        isSendNewPasswordInFlight,
        sendNewPasswordError,
        sendNewPassword,
      },
      state: { email, validationError },
      handleEmailChange,
      handleSubmit,
    } = this;
    return (
      <ScrollView>
        <View style={scene.contentNoTop}>
          <Text style={modal.title}>Request Password Reset</Text>
          <Text style={[modal.copy, styles.copy]}>
            Enter your email address below and you will be emailed a temporary
            password.
          </Text>
          <ForgotPasswordForm
            isSendNewPasswordInFlight={isSendNewPasswordInFlight}
            sendNewPasswordError={sendNewPasswordError}
            validationError={validationError}
            sendNewPassword={sendNewPassword}
            email={email}
            onEmailChange={handleEmailChange}
            onSubmit={handleSubmit}
          />
        </View>
      </ScrollView>
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
