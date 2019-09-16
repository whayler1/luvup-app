import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { SafeAreaView, View, KeyboardAvoidingView, Text } from 'react-native';
import { Actions } from 'react-native-router-flux';

import styles from './ForgotPassword.styles';
import { scene } from '../../styles';
import { sendNewPassword as sendNewPasswordAction } from '../../redux/user/user.actions';
import { emailRegex } from '../../helpers';
import ForgotPasswordForm from './ForgotPasswordForm';
import Button, { BUTTON_STYLES } from '../../components/Button';

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
    Actions.reset('login', { username: this.state.email });
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
        <SafeAreaView style={scene.container}>
          <View style={scene.contentNoTop}>
            <View style={scene.contentTop}>
              <Text style={[scene.titleCopy, scene.textCenter]}>
                Email Sent
              </Text>
              <Text
                style={[scene.largeCopy, scene.textCenter, scene.gutterTop]}>
                An email with a temporary password has been sent to{' '}
                {this.state.email}.
              </Text>
              <Text style={[scene.bodyCopy, scene.textCenter, scene.gutterTop]}>
                After you log in with your new password you will be prompted to
                change it to a password of your liking.
              </Text>
            </View>
            <View style={scene.contentBottom}>
              <Button
                testID="forgot-password-login-button"
                onPress={this.handleGoToLogin}
                buttonStyles={BUTTON_STYLES.INFO_SKELETON}
                title="Login"
              />
            </View>
          </View>
        </SafeAreaView>
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
      <KeyboardAvoidingView style={scene.container} behavior="height">
        <View style={scene.contentNoTop}>
          <View style={scene.contentTop}>
            <Text style={[scene.titleCopy, scene.textCenter]}>
              Password Reset
            </Text>
            <Text style={[scene.bodyCopy, styles.copy, scene.gutterTop]}>
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
