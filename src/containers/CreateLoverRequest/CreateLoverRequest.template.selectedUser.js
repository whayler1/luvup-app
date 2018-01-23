import React from 'react';
import { Text, TextInput, FlatList, View, TouchableOpacity } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Button } from 'react-native-elements';

import { forms, buttons, scene } from '../../styles';

export default ({
  selectedUser,
}) => (
  <KeyboardAwareScrollView
    resetScrollToCoords={{ x: 0, y: 0 }}
    contentContainerStyle={scene.container}
    scrollEnabled={true}
  >
    <Text>Send Lover Request to {`${selectedUser.firstName} ${selectedUser.lastName}?`}</Text>
  </KeyboardAwareScrollView>
);
