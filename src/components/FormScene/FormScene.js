import React from 'react';
import PropTypes from 'prop-types';
import { KeyboardAvoidingView, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-navigation';

import { scene } from '../../styles';
import styles from './FormScene.styles';

const FormScene = ({ children }) => (
  <SafeAreaView forceInset={{ bottom: 'never' }} style={scene.safeAreaView}>
    <KeyboardAvoidingView style={scene.container} behavior="padding">
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={[
          scene.contentTop,
          styles.scrollViewContentContainer,
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
