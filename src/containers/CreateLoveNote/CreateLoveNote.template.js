import React, { PureComponent } from 'react';
import {
  View,
  Text,
  TextInput,
  Animated,
} from 'react-native';

import styles from './CreateLoveNote.styles.js';
import { forms, buttons, scene, modal, vars, } from '../../styles';

export default ({
  note,
  onNoteChange,
  focusInput = '',
  isInFlight = false,
}) => (
  <View style={{
    paddingHorizontal: 16,
  }}>
    <Text style={modal.title}>Create Love Note</Text>
    <View style={forms.formGroup}>
      <Text style={forms.label}>Note</Text>
      <TextInput
        style={[forms.input, focusInput === 'currentPassword' && forms.inputFocus]}
        onChangeText={onNoteChange}
        value={note}
        maxLength={1000}
        editable={!isInFlight}
        placeholder="Lorem Ipsum"
        placeholderTextColor={vars.blueGrey100}
        returnKeyType="next"
      />
    </View>
  </View>
);
