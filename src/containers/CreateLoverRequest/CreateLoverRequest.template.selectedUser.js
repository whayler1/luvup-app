import React from 'react';
import {
  Text,
  TextInput,
  FlatList,
  View,
  KeyboardAvoidingView,
  TouchableOpacity,
} from 'react-native';
import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/Ionicons';

import styles from './CreateLoverRequest.styles';
import { forms, buttons, modal, scene, vars } from '../../styles';
import Well from '../../components/Well';

export default ({
  clearSelectedUser,
  requestLover,
  selectedUser,
  requestLoverIsInFlight,
  error,
}) => (
  <KeyboardAvoidingView
    contentContainerStyle={scene.keyboardAvoidingView}
    style={styles.container}
    keyboardVerticalOffset={32}
    behavior="padding"
  >
    <View style={scene.content}>
      <View style={{
        alignItems: 'center',
      }}>
        <Icon
          name="ios-send-outline"
          size={80}
          color={vars.blue500}
        />
      </View>
      <Text style={[scene.copy, { textAlign: 'center' }]}>Send Lover Request to</Text>
      <Text style={[scene.copy, { textAlign: 'center', fontSize: 30, }]}>{`${selectedUser.firstName} ${selectedUser.lastName}?`}</Text>
      {error === 'request-lover' && <Well text="There was an error requesting your lover."/>}
      <View style={forms.buttonRow}>
        <View style={{
          flex: 0.5,
          paddingRight: 8,
        }}>
          <Button
            onPress={clearSelectedUser}
            containerViewStyle={buttons.container}
            buttonStyle={buttons.secondarySkeletonButton}
            textStyle={buttons.secondarySkeletonText}
            disabled={requestLoverIsInFlight}
            title="Back"
          />
        </View>
        <View style={{
          flex: 0.5,
          paddingLeft: 8,
        }}>
          <Button
            onPress={requestLover}
            containerViewStyle={buttons.infoContainer}
            buttonStyle={buttons.infoButton}
            textStyle={buttons.infoText}
            disabled={requestLoverIsInFlight}
            title={requestLoverIsInFlight ? 'Requesting…' : 'Request Lover'}
          />
        </View>
      </View>
    </View>
  </KeyboardAvoidingView>
);
