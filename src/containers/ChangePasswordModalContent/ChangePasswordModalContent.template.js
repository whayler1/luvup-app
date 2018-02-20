import React from 'react';
import {
  View,
  Text,
  TextInput,
} from 'react-native';
import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/Ionicons';

import { modal, buttons, forms, vars } from '../../styles';

const getCloseButton = ({ isInFlight, closeModal }) => (
  <Button
    onPress={closeModal}
    containerViewStyle={buttons.infoContainer}
    buttonStyle={buttons.secondarySkeletonButton}
    textStyle={buttons.secondarySkeletonText}
    title={'Close'}
    disabled={isInFlight}
  />
);

export default ({
  currentPassword,
  newPassword,
  newPasswordAgain,
  onCurrentPasswordChange,
  onNewPasswordChange,
  onNewPasswordAgainChange,
  onCurrentPasswordFocus,
  onNewPasswordFocus,
  onNewPasswordAgainFocus,
  onBlur,
  onSubmit,
  closeModal,
  focusInput,
  isInFlight,
  success,
  error,
}) => (
  <View style={{
    alignSelf: 'stretch',
  }}>
    <Text style={modal.title}>Change Password</Text>
    {success && [
    <View
      key={1}
      style={forms.formGroup}
    >
      <Icon
        name="ios-checkmark-circle-outline"
        size={40}
        color={vars.success}
      />
      <Text style={modal.copy}>
        Your Password has been changed successully!
      </Text>
    </View>,
    <View
      key={2}
      style={forms.buttonRow}
    >
      {getCloseButton({ isInFlight, closeModal })}
    </View>
    ]}
    {!success && [
    <View
      key={3}
      style={forms.formGroup}
    >
      <Text style={forms.label}>Current Password</Text>
      <TextInput
        style={[forms.input, focusInput === 'currentPassword' && forms.inputFocus]}
        onChangeText={onCurrentPasswordChange}
        onFocus={onCurrentPasswordFocus}
        onBlur={onBlur}
        value={currentPassword}
        secureTextEntry={true}
        maxLength={50}
        editable={!isInFlight}
        spellCheck={false}
        placeholder="Min 8 chars. No spaces"
        placeholderTextColor={vars.blueGrey100}
      />
    </View>,
    <View
      key={4}
      style={forms.formGroup}
    >
      <Text style={forms.label}>New Password</Text>
      <TextInput
        style={[forms.input, focusInput === 'newPassword' && forms.inputFocus]}
        onChangeText={onNewPasswordChange}
        onFocus={onNewPasswordFocus}
        onBlur={onBlur}
        value={newPassword}
        secureTextEntry={true}
        maxLength={50}
        editable={!isInFlight}
        spellCheck={false}
        placeholder="Min 8 chars. No spaces."
        placeholderTextColor={vars.blueGrey100}
      />
    </View>,
    <View
      key={5}
      style={forms.formGroup}
    >
      <Text style={forms.label}>Repeat New Password</Text>
      <TextInput
        style={[forms.input, focusInput === 'newPasswordAgain' && forms.inputFocus]}
        onChangeText={onNewPasswordAgainChange}
        onFocus={onNewPasswordAgainFocus}
        onBlur={onBlur}
        value={newPasswordAgain}
        secureTextEntry={true}
        maxLength={50}
        editable={!isInFlight}
        spellCheck={false}
        placeholder="Must match new password"
        placeholderTextColor={vars.blueGrey100}
      />
    </View>,
    <View
      key={6}
      style={forms.buttonRow}
    >
      <View style={{
        width: '50%',
        paddingRight: 8,
      }}>
        {getCloseButton({ isInFlight, closeModal })}
      </View>
      <View style={{
        width: '50%',
        paddingLeft: 8,
      }}>
        <Button
          onPress={onSubmit}
          containerViewStyle={buttons.container}
          buttonStyle={buttons.infoButton}
          textStyle={buttons.infoText}
          title={isInFlight ? 'Changing…' : 'Change'}
          disabled={isInFlight}
        />
      </View>
    </View>]}
  </View>
);
