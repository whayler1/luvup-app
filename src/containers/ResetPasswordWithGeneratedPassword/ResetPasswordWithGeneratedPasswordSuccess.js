import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-native-elements';
import { View, Text } from 'react-native';

import styles from './ResetPasswordWithGeneratedPassword.styles';
import { scene, modal, buttons, forms } from '../../styles';

const ResetPasswordWithGeneratedPasswordSuccess = ({ onDone }) => (
  <View style={scene.content}>
    <Text style={modal.title}>New Password Created</Text>
    <Text style={[modal.copy, styles.copy]}>
      Your new password has been created successfully!
    </Text>
    <View style={forms.formGroup}>
      <Button
        testID="reset-password-success-done-button"
        onPress={onDone}
        containerViewStyle={buttons.container}
        buttonStyle={buttons.infoSkeletonButton}
        textStyle={buttons.infoSkeletonText}
        title="Done"
      />
    </View>
  </View>
);

ResetPasswordWithGeneratedPasswordSuccess.propTypes = {
  onDone: PropTypes.func.isRequired,
};

export default ResetPasswordWithGeneratedPasswordSuccess;
