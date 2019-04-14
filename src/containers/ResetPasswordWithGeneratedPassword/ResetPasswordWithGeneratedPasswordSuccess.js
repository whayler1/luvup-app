import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-native-elements';
import { SafeAreaView, View, Text } from 'react-native';

import { scene, buttons, forms } from '../../styles';

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
              containerViewStyle={buttons.container}
              buttonStyle={buttons.infoSkeletonButton}
              textStyle={buttons.infoSkeletonText}
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
