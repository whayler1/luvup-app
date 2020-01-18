import React from 'react';
import PropTypes from 'prop-types';
import { KeyboardAvoidingView, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-navigation';
import isFunction from 'lodash/isFunction';

import { scene, quiz } from '../../styles';
import { isIOS } from '../../services/device';

const keyboardAvoidingViewDeviceSpecificProps = () =>
  isIOS() ? { behavior: 'height' } : {};

const CustomHeaderScene = ({ renderHeader, children }) => (
  <SafeAreaView forceInset={{ bottom: 'never' }} style={scene.safeAreaView}>
    {isFunction(renderHeader) && renderHeader()}
    <KeyboardAvoidingView
      {...keyboardAvoidingViewDeviceSpecificProps()}
      style={quiz.container}
      contentContainerStyle={quiz.container}
    >
      <ScrollView
        style={quiz.scrollContainer}
        contentContainerStyle={quiz.scrollContent}
      >
        {children}
      </ScrollView>
    </KeyboardAvoidingView>
  </SafeAreaView>
);

CustomHeaderScene.propTypes = {
  renderHeader: PropTypes.func,
  children: PropTypes.node,
};

export default CustomHeaderScene;
