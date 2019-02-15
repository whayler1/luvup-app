import React, { PureComponent } from 'react';
import { View, Text, TextInput } from 'react-native';
import PropTypes from 'prop-types';
import { Button } from 'react-native-elements';

import { vars, forms, buttons } from '../../styles';

class ForgotPasswordForm extends PureComponent {
  static propTypes = {
    isSendNewPasswordInFlight: PropTypes.bool.isRequired,
    sendNewPasswordError: PropTypes.string.isRequired,
    validationError: PropTypes.string.isRequired,
    onSubmit: PropTypes.func.isRequired,
    onEmailChange: PropTypes.func.isRequired,
    email: PropTypes.string.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      isFocus: false,
    };
  }

  handleBlur = () => {
    this.setState({ isFocus: false });
  };

  handleFocus = () => {
    this.setState({ isFocus: true });
  };

  render() {
    const {
      props: {
        isSendNewPasswordInFlight,
        sendNewPasswordError,
        validationError,
        onSubmit,
        onEmailChange,
        email,
      },
      state: { isFocus },
    } = this;

    return (
      <View>
        <View style={forms.formGroup}>
          <Text style={forms.label}>Email</Text>
          <TextInput
            style={[forms.input, isFocus && forms.inputFocus]}
            onFocus={this.handleFocus}
            onBlur={this.handleBlur}
            onChangeText={onEmailChange}
            value={email}
            maxLength={50}
            placeholder="jane.doe@email.com"
            placeholderTextColor={vars.blueGrey100}
            autoCapitalize={'none'}
            editable={!isSendNewPasswordInFlight}
            spellCheck={false}
            keyboardType="email-address"
            returnKeyType="go"
            onSubmitEditing={onSubmit}
          />
          {[sendNewPasswordError, validationError].map(
            (error, i) =>
              error.length > 0 && (
                <Text key={i} style={forms.error}>
                  {error}
                </Text>
              )
          )}
        </View>
        <View style={forms.formGroup}>
          <Button
            onPress={onSubmit}
            containerViewStyle={buttons.container}
            buttonStyle={buttons.infoButton}
            textStyle={buttons.infoText}
            title={isSendNewPasswordInFlight ? 'Submitting…' : 'Submit'}
            disabled={isSendNewPasswordInFlight}
          />
        </View>
      </View>
    );
  }
}

export default ForgotPasswordForm;
