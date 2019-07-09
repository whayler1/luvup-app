import React from 'react';
import PropTypes from 'prop-types';
import { KeyboardAvoidingView, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-navigation';

import { scene, vars } from '../../styles';

const FormScene = ({ children }) => (
  <SafeAreaView forceInset={{ bottom: 'never' }} style={scene.safeAreaView}>
    <KeyboardAvoidingView style={scene.container} behavior="padding">
      <ScrollView
        contentContainerStyle={[
          scene.contentTop,
          {
            paddingBottom: vars.gutterDouble * 2,
          },
        ]}>
        {children}
      </ScrollView>
    </KeyboardAvoidingView>
  </SafeAreaView>
);

FormScene.propTypes = {
  children: PropTypes.node,
};

export default FormScene;
