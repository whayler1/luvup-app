import React, { PureComponent, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { SafeAreaView, View, Text } from 'react-native';
import { Actions } from 'react-native-router-flux';
import pick from 'lodash/pick';
import isString from 'lodash/isString';

import Input from '../../components/Input';
import Button, { BUTTON_STYLES } from '../../components/Button';
import Well from '../../components/Well';
import { scene } from '../../styles';
import { emailRegex } from '../../helpers';
import { resendLoverRequestEmail as resendLoverRequestEmailAction } from '../../redux/loverRequest/loverRequest.actions';

class ResendLoverRequest extends PureComponent {
  static propTypes = {
    loverEmail: PropTypes.string,
    loverFirstName: PropTypes.string,
    loverRequestId: PropTypes.string.isRequired,
    resendLoverRequestEmail: PropTypes.func.isRequired,
    isResendRequestEmailInFlight: PropTypes.bool.isRequired,
    resendLoverRequestEmailError: PropTypes.string.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      isSent: false,
      email: props.loverEmail || '',
      emailError: '',
      isSuccess: false,
    };
  }

  componentDidUpdate(prevProps) {
    if (
      prevProps.isResendRequestEmailInFlight &&
      !this.props.isResendRequestEmailInFlight &&
      this.props.resendLoverRequestEmailError.length < 1
    ) {
      /* eslint-disable-next-line react/no-did-update-set-state */
      this.setState({ isSuccess: true });
    }
  }

  handleEmailChange = email => {
    this.setState({ email });
  };

  validate = async () => {
    const { email } = this.state;
    const stateObj = {
      emailError: '',
    };

    if (!emailRegex.test(email)) {
      stateObj.emailError = 'Please provide a valid email';
    }

    await this.setState(stateObj);
  };

  errorStateValues = () =>
    Object.values(pick(this.props, ['emailError', 'requestError']));

  isValid = () => this.errorStateValues().every(value => value === '');

  handleSubmit = async () => {
    const {
      props: { resendLoverRequestEmail, loverRequestId },
      state: { email },
      validate,
      isValid,
    } = this;
    await validate();
    if (isValid()) {
      resendLoverRequestEmail(loverRequestId, email);
    }
  };

  handleDone = () => {
    Actions.pop();
  };

  render() {
    const {
      props: {
        loverFirstName,
        isResendRequestEmailInFlight,
        resendLoverRequestEmailError,
      },
      state: { email, emailError, isSuccess },
      handleEmailChange,
      handleSubmit,
      handleDone,
    } = this;
    return (
      <SafeAreaView style={scene.safeAreaView}>
        <View style={scene.content}>
          <View style={scene.contentTop}>
            {isSuccess ? (
              <Fragment>
                <Text style={[scene.titleCopy, scene.textCenter]}>
                  Lover Request Re-Sent
                </Text>
                <Text
                  style={[scene.bodyCopy, scene.textCenter, scene.gutterTop]}>
                  A new Lover Request has been sent to {loverFirstName} at{' '}
                  {email}.
                </Text>
                <View style={scene.gutterAndHalfTop}>
                  <Button
                    buttonStyles={BUTTON_STYLES.INFO_SKELETON}
                    title="Done"
                    onPress={handleDone}
                  />
                </View>
              </Fragment>
            ) : (
              <Fragment>
                <Text style={[scene.titleCopy, scene.textCenter]}>
                  Re-Send Lover Request
                </Text>
                <Text
                  style={[scene.bodyCopy, scene.textCenter, scene.gutterTop]}>
                  Send {loverFirstName} another Lover Request
                </Text>
                <Input
                  label="Email"
                  onChangeText={handleEmailChange}
                  value={email}
                  placeholder="jane.doe@email.com"
                  error={emailError}
                  inputProps={{
                    autoCapitalize: 'none',
                    editable: true,
                    spellCheck: false,
                    keyboardType: 'email-address',
                    returnKeyType: 'go',
                    onSubmitEditing: handleSubmit,
                    testID: 'resend-lover-request-email-input',
                  }}
                />
                {isString(resendLoverRequestEmailError) &&
                  resendLoverRequestEmailError.length > 0 && (
                    <Well
                      text={resendLoverRequestEmailError}
                      styles={scene.gutterAndHalfTop}
                    />
                  )}
                <View style={scene.gutterAndHalfTop}>
                  <Button
                    title="Resend Lover Request"
                    onPress={handleSubmit}
                    isInFlight={isResendRequestEmailInFlight}
                  />
                </View>
              </Fragment>
            )}
          </View>
        </View>
      </SafeAreaView>
    );
  }
}

export default connect(
  state => ({
    loverEmail: state.lover.email,
    loverFirstName: state.lover.firstName,
    loverRequestId: state.loverRequest.id,
    isResendRequestEmailInFlight:
      state.loverRequest.isResendRequestEmailInFlight,
    resendLoverRequestEmailError:
      state.loverRequest.resendLoverRequestEmailError,
  }),
  {
    resendLoverRequestEmail: resendLoverRequestEmailAction,
  }
)(ResendLoverRequest);
