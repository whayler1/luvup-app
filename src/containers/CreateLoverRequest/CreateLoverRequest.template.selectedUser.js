import React from 'react';
import { Text, TextInput, FlatList, View, TouchableOpacity } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Button } from 'react-native-elements';

import { forms, buttons, scene } from '../../styles';

export default ({
  clearSelectedUser,
  requestLover,
  selectedUser,
  requestLoverIsInFlight,
  error,
}) => (
  <KeyboardAwareScrollView
    resetScrollToCoords={{ x: 0, y: 0 }}
    contentContainerStyle={scene.container}
    scrollEnabled={true}
  >
    {(() => console.log('zfzfzfff', requestLover))()}
    <Button
      raised
      onPress={clearSelectedUser}
      containerViewStyle={buttons.infoContainer}
      buttonStyle={buttons.infoButton}
      textStyle={buttons.infoText}
      title={'Back'}
    />
    <Text>Send Lover Request to {`${selectedUser.firstName} ${selectedUser.lastName}?`}</Text>
    {error === 'request-lover' && <Text style={styles.error}>There was an error requesting your lover.</Text>}
    <Button
      raised
      onPress={requestLover}
      containerViewStyle={buttons.infoContainer}
      buttonStyle={buttons.infoButton}
      textStyle={buttons.infoText}
      disabled={requestLoverIsInFlight}
      title={'Request Lover'}
    />
  </KeyboardAwareScrollView>
);
