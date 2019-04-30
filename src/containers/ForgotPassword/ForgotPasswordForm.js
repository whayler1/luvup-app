import React from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';

import { forms } from '../../styles';
import Input from '../../components/Input';
import Button from '../../components/Button';

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
        title="Submit"
        isInFlight={isSendNewPasswordInFlight}
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
