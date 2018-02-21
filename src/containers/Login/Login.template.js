import React from 'react';
import { View, Text, TextInput, KeyboardAvoidingView, } from 'react-native';
import { Button } from 'react-native-elements';
import styles from './Login.styles';
import { scene, forms, buttons, modal, wells, vars } from '../../styles';

export default ({
  navigateToSignUpConfirm,
  navigateToSignUp,
  onSubmit,
  onUsernameFocus,
  onPasswordFocus,
  onUsernameChange,
  onPasswordChange,
  onBlur,
  username,
  password,
  error,
  isInFlight,
  focus,
}) => {
  /**
   * JW: This is probably not the best way to set input focus on refs,
   * but works for now™
   */
  let passwordInput;
  const focusPassword = () => passwordInput.focus();

  return (
    <KeyboardAvoidingView
      contentContainerStyle={[scene.container, {
        alignSelf: 'stretch'
      }]}
      style={scene.container}
      keyboardVerticalOffset={32}
      behavior="padding"
    >
      <View style={scene.content}>
        <Text style={modal.title}>Login</Text>
        <View style={forms.formGroup}>
          <Text style={forms.label}>Email</Text>
          <TextInput
            style={[forms.input, focus === 'username' && forms.inputFocus]}
            onFocus={onUsernameFocus}
            onBlur={onBlur}
            onChangeText={onUsernameChange}
            value={username}
            maxLength={50}
            placeholder="jane.doe@email.com"
            placeholderTextColor={vars.blueGrey100}
            autoCapitalize={'none'}
            editable={!isInFlight}
            spellCheck={false}
            keyboardType="email-address"
            returnKeyType="next"
            onSubmitEditing={focusPassword}
          />
          {error === 'username' && <Text style={forms.error}>Please provide a valid email</Text>}
        </View>
        <View style={forms.formGroup}>
          <Text style={forms.label}>Password</Text>
          <TextInput
            ref={el => passwordInput = el}
            style={[forms.input, focus === 'password' && forms.inputFocus]}
            onFocus={onPasswordFocus}
            onBlur={onBlur}
            onChangeText={onPasswordChange}
            value={password}
            secureTextEntry={true}
            maxLength={50}
            placeholder="••••••••"
            placeholderTextColor={vars.blueGrey100}
            editable={!isInFlight}
            spellCheck={false}
            returnKeyType="go"
            onSubmitEditing={onSubmit}
          />
          {error === 'password' && <Text style={styles.error}>Please provide a password</Text>}
        </View>
        {(error === 'credentials' || error === 'server') &&
          <View style={[wells.error, { marginTop: 32, marginBottom: 0 }]}>
            <Text style={wells.errorText}>Invalid email or password</Text>
          </View>
        }
        <View style={forms.buttonRow}>
          <View style={{
            flex: 1,
          }}>
            <Button
              onPress={onSubmit}
              containerViewStyle={buttons.container}
              buttonStyle={buttons.infoButton}
              textStyle={buttons.infoText}
              title={isInFlight ? 'Submitting…' : 'Submit'}
              disabled={isInFlight}
            />
          </View>
        </View>
        <View style={{
          marginTop: 40,
        }}>
          <Text style={scene.copy}>
            {'Don\'t have an account?'}
          </Text>
        </View>
        <View style={[forms.buttonRow, { marginTop: 16, }]}>
          <View style={{
            flex: 0.5,
            paddingRight: 8,
          }}>
            <Button
              onPress={navigateToSignUpConfirm}
              containerViewStyle={buttons.container}
              buttonStyle={buttons.secondarySkeletonButton}
              textStyle={buttons.secondarySkeletonText}
              title={'Confirm Sign Up'}
            />
          </View>
          <View style={{
            flex: 0.5,
            paddingLeft: 8,
          }}>
            <Button
              onPress={navigateToSignUp}
              containerViewStyle={buttons.container}
              buttonStyle={buttons.infoSkeletonButton}
              textStyle={buttons.infoSkeletonText}
              title={'Sign Up'}
            />
          </View>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};
