import React from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import { Button } from 'react-native-elements';

import { forms, buttons } from '../../styles';
import Input from '../../components/Input';

const ForgotPasswordForm = ({
  isSendNewPasswordInFlight,
  sendNewPasswordError,
  validationError,
  onSubmit,
  onEmailChange,
  email,
}) => (
  <View>
    <Input
      label="Email"
      value={email}
      placeholder="jane.doe@email.com"
      onChangeText={onEmailChange}
      error={sendNewPasswordError || validationError}
      inputProps={{
        autoCapitalize: 'none',
        testID: 'forgot-password-email-input',
        editable: !isSendNewPasswordInFlight,
        spellCheck: false,
        keyboardType: 'email-address',
        returnKeyType: 'go',
        onSubmitEditing: onSubmit,
      }}
    />
    <View style={forms.formGroup}>
      <Button
        testID="forgot-password-submit"
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

ForgotPasswordForm.propTypes = {
  isSendNewPasswordInFlight: PropTypes.bool.isRequired,
  sendNewPasswordError: PropTypes.string.isRequired,
  validationError: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onEmailChange: PropTypes.func.isRequired,
  email: PropTypes.string.isRequired,
};

export default ForgotPasswordForm;
