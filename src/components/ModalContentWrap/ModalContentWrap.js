import React from 'react';
import {
  View,
  Modal,
} from 'react-native';

import { modal } from '../../styles';

export default ({
  visible,
  onRequestClose,
  children,
}) => (
  <Modal
    {...{
      visible,
      onRequestClose,
    }}
    animationType={'fade'}
    transparent={true}
  >
    <View style={modal.outerContainer}>
      <View style={modal.innerContainer}>
        {children}
      </View>
    </View>
  </Modal>
);
