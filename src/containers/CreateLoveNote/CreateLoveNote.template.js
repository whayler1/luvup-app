import React, { PureComponent } from 'react';
import {
  View,
  Text,
  TextInput,
  KeyboardAvoidingView,
  Animated,
} from 'react-native';

import styles from './CreateLoveNote.styles.js';
import { forms, buttons, scene, modal, vars, } from '../../styles';

export default ({
  note,
  onNoteChange,
  loverFirstName,
  focusInput = '',
  isInFlight = false,
}) => (
  <KeyboardAvoidingView
    contentContainerStyle={{
      flex: 1
    }}
    style={{
      flex: 1,
    }}
    behavior="padding"
  >
    <View style={{
      paddingHorizontal: 16,
      paddingTop: 16,
    }}>
      <Text style={modal.title}>Love Note</Text>
      <View style={forms.formGroup}>
        <TextInput
          style={[forms.multilineInput, focusInput === 'currentPassword' && forms.inputFocus]}
          onChangeText={onNoteChange}
          value={note}
          maxLength={1000}
          editable={!isInFlight}
          placeholder={`Tell ${ loverFirstName } what's on your mind.`}
          placeholderTextColor={vars.blueGrey100}
          multiline={true}
        />
      </View>
    </View>
  </KeyboardAvoidingView>
);
