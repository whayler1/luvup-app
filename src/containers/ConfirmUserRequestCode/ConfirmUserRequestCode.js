import React, { Component } from 'react';
import _ from 'lodash';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Text, View, ScrollView, KeyboardAvoidingView } from 'react-native';

import { forms, scene } from '../../styles';
import Well from '../../components/Well';
import Input from '../../components/Input';
import Button from '../../components/Button';
import InputNumber from '../../components/Input/InputNumber';
import { emailRegex } from '../../helpers';
import {
  confirmUserRequestCode as confirmUserRequestCodeAction,
  clearUserRequestCodeError as clearUserRequestCodeErrorAction,
} from '../../redux/user/user.actions';
import styles from './ConfirmUserRequestCode.styles';

const IS_VALID_CODE_REGEX = /^[0-9]{6}$/;

class ConfirmUserRequestCode extends Component {
  static propTypes = {
    email: PropTypes.string,
    confirmUserRequestCode: PropTypes.func.isRequired,
    clearUserRequestCodeError: PropTypes.func.isRequired,
    isConfirmUserRequestCodeInFlight: PropTypes.bool.isRequired,
    confirmUserRequestCodeError: PropTypes.string.isRequired,
  };

  constructor(props) {
    super(props);

    props.clearUserRequestCodeError();

    this.state = {
      email: props.email || '',
      code: '',
      error: '',
      focusInput: '',
      isFirstSubmitDone: false,
    };

    this.isEmailSetonInit = _.isString(props.email) && props.email.length > 0;
  }

  handleEmailChange = email => {
    this.setState({ email, error: '' });
  };
  handleCodeChange = (value, index) => {
    this.setState(state => {
      const code = _.times(6, n => {
        if (n === index) {
          if (value === '') {
            return ' ';
          }
          return value;
        }
        if (state.code[n]) {
          return state.code[n];
        }
        return ' ';
      }).join('');
      return { code, error: '' };
    });
    this.props.clearUserRequestCodeError();
  };
  handleFocusCode = () => {
    this.codeEl.focus();
  };

  getValidationError = () => {
    const { email, code } = this.state;
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
  };

  handleSubmitSuccess = () => {
    Actions.confirmUserRequestCreateProfile();
  };

  setCodeRef = el => {
    this.codeEl = el;
  };

  getEmailError = () => {
    const { error } = this.state;
    if (error === 'email') {
      return 'Please provide a valid email';
    }
    if (error === 'no user request') {
      return 'There is no sign up request for that email';
    }
    return '';
  };

  getCodeError = () => {
    const { error } = this.state;
    if (error === 'code') {
      return 'Please provide the code that was emailed to you';
    }
    if (error === 'code-length') {
      return 'Codes are 6 characters long';
    }
    if (error === 'invalid code') {
      return 'Invalid Code';
    }
    if (error === 'expired code') {
      return 'Expired code';
    }
    return '';
  };

  submit = async () => {
    const { email, code } = this.state;
    const res = await this.props.confirmUserRequestCode(email, code);

    const confirmUserRequestCode = _.get(
      res,
      'body.data.confirmUserRequestCode'
    );

    if (confirmUserRequestCode) {
      if (confirmUserRequestCode.error && confirmUserRequestCode.error.length) {
        this.setState({
          error: confirmUserRequestCode.error,
        });
      } else {
        this.setState(
          {
            error: '',
          },
          this.handleSubmitSuccess
        );
      }
    } else {
      this.setState({
        error: 'server',
      });
    }
  };

  handleSubmit = () => {
    const errorStr = this.getValidationError();

    if (errorStr.length) {
      this.setState({ error: errorStr });
      return;
    }
    this.setState({ error: '', isFirstSubmitDone: true }, this.submit);
  };

  componentDidUpdate(prevProps, prevState) {
    if (
      !this.state.isFirstSubmitDone &&
      this.state.email.length > 4 &&
      prevState.code !== this.state.code &&
      IS_VALID_CODE_REGEX.test(this.state.code)
    ) {
      this.handleSubmit();
    }
  }

  render() {
    const {
      handleEmailChange,
      handleCodeChange,
      handleSubmit,
      handleFocusCode,
      setCodeRef,
      getEmailError,
      getCodeError,
      isEmailSetonInit,
      state: { email, code, error: stateError },
      props: {
        isConfirmUserRequestCodeInFlight: isInFlight,
        confirmUserRequestCodeError,
      },
    } = this;
    return (
      <KeyboardAvoidingView style={scene.container} behavior="padding">
        <View style={scene.contentNoTop}>
          <ScrollView
            contentContainerStyle={[scene.contentTop, styles.scrollView]}>
            <Text
              testID="confirm-usercode-title"
              style={[scene.titleCopy, scene.textCenter]}>
              Confirm Sign Up Code
            </Text>
            <Text style={[scene.bodyCopy, scene.gutterTop, scene.textCenter]}>
              {`Enter ${
                isEmailSetonInit ? '' : 'your email address and '
              }the code you received via email below.`}
            </Text>
            {!isEmailSetonInit && (
              <Input
                {...{
                  label: 'Email',
                  onChangeText: handleEmailChange,
                  value: email,
                  placeholder: 'jane.doe@email.com',
                  error: getEmailError(),
                  inputProps: {
                    keyboardType: 'email-address',
                    autoCapitalize: 'none',
                    editable: !isInFlight,
                    spellCheck: false,
                    returnKeyType: 'next',
                    onSubmitEditing: handleFocusCode,
                  },
                }}
              />
            )}
            <InputNumber
              {...{
                label: 'Code',
                onChangeText: handleCodeChange,
                value: code,
                error: getCodeError(),
                editable: !isInFlight,
                setFirstRef: setCodeRef,
              }}
            />
            {confirmUserRequestCodeError.length > 0 && (
              <Well text={confirmUserRequestCodeError} />
            )}
            <View style={forms.buttonRow}>
              <View style={styles.submitWrapper}>
                <Button
                  testID="confirm-usercode-submit"
                  onPress={handleSubmit}
                  title="Submit"
                  isInFlight={isInFlight}
                />
              </View>
            </View>
          </ScrollView>
        </View>
      </KeyboardAvoidingView>
    );
  }
}

export default connect(
  state => ({
    email: state.user.email,
    isConfirmUserRequestCodeInFlight:
      state.user.isConfirmUserRequestCodeInFlight,
    confirmUserRequestCodeError: state.user.confirmUserRequestCodeError,
  }),
  {
    confirmUserRequestCode: confirmUserRequestCodeAction,
    clearUserRequestCodeError: clearUserRequestCodeErrorAction,
  }
)(ConfirmUserRequestCode);
