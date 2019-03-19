import React, { PureComponent } from 'react';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Text, View, KeyboardAvoidingView } from 'react-native';
import { Button } from 'react-native-elements';
import Input from '../../components/Input';

import { buttons, forms, scene, wells } from '../../styles';
import styles from './SignUp.styles';
import { emailRegex } from '../../helpers';
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

  handleEmailChange = email => this.setState({ email });

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
    const {
      handleSubmit,
      handleEmailChange,
      state: { email, error },
      props: { isUserRequestInFlight: isInFlight, userRequestError },
    } = this;
    return (
      <KeyboardAvoidingView style={scene.container} behavior="padding">
        <View style={scene.contentNoTop}>
          <View style={scene.contentTop}>
            <Text style={[scene.titleCopy, scene.textCenter]}>Sign Up</Text>
            <Input
              onChangeText={handleEmailChange}
              value={email}
              placeholder="jane.doe@email.com"
              label="Email"
              error={
                error === 'email' ? 'Please enter a valid email address' : ''
              }
              inputProps={{
                testID: 'signup-email-input',
                returnKeyType: 'go',
                keyboardType: 'email-address',
                autoCapitalize: 'none',
                autoCorrect: false,
                editable: !isInFlight,
                spellCheck: false,
                onSubmitEditing: handleSubmit,
              }}
            />
            {userRequestError.length > 0 && (
              <View style={[wells.error, styles.errorWellWrapper]}>
                <Text style={wells.errorText}>{userRequestError}</Text>
              </View>
            )}
            <View style={forms.buttonRow}>
              <View style={styles.submitWrap}>
                <Button
                  onPress={handleSubmit}
                  containerViewStyle={buttons.container}
                  buttonStyle={buttons.infoButton}
                  textStyle={buttons.infoText}
                  title={isInFlight ? 'Submitting…' : 'Submit'}
                  disabled={isInFlight}
                />
              </View>
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
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
