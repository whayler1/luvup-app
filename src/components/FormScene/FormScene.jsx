import React from 'react';
import PropTypes from 'prop-types';
import { KeyboardAvoidingView, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-navigation';

import { scene } from '../../styles';
import styles from './FormScene.styles';
import { isIOS } from '../../services/device';

const FormScene = ({ children }) => {
  const keyboardAvoidingViewProps = {};
  if (isIOS()) {
    keyboardAvoidingViewProps.behavior = 'padding';
  }
  return (
    <SafeAreaView forceInset={{ bottom: 'never' }} style={scene.safeAreaView}>
      <KeyboardAvoidingView
        style={scene.container}
        {...keyboardAvoidingViewProps}
      >
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={[
            scene.contentTop,
            styles.scrollViewContentContainer,
          ]}
        >
          {children}
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

FormScene.propTypes = {
  children: PropTypes.node,
};

export default FormScene;
