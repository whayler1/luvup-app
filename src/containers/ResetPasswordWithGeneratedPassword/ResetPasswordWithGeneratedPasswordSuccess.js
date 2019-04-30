import React from 'react';
import PropTypes from 'prop-types';
import { SafeAreaView, View, Text } from 'react-native';

import { scene, forms } from '../../styles';
import Button, { BUTTON_STYLES } from '../../components/Button';

const ResetPasswordWithGeneratedPasswordSuccess = ({ onDone }) => (
  <SafeAreaView style={scene.safeAreaView}>
    <View style={scene.container}>
      <View style={scene.content}>
        <View style={scene.contentTop}>
          <Text style={[scene.titleCopy, scene.textCenter]}>
            New Password Created
          </Text>
          <Text style={[scene.largeCopy, scene.textCenter]}>
            Your new password has been created successfully!
          </Text>
        </View>
        <View style={scene.contentBottom}>
          <View style={forms.formGroup}>
            <Button
              testID="reset-password-success-done-button"
              onPress={onDone}
              buttonStyles={BUTTON_STYLES.INFO_SKELETON}
              title="Done"
            />
          </View>
        </View>
      </View>
    </View>
  </SafeAreaView>
);

ResetPasswordWithGeneratedPasswordSuccess.propTypes = {
  onDone: PropTypes.func.isRequired,
};

export default ResetPasswordWithGeneratedPasswordSuccess;
