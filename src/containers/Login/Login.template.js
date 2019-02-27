import React from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { Button } from 'react-native-elements';

import styles from './Login.styles';
import { scene, forms, buttons, modal, wells, vars } from '../../styles';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

export default ({
  navigateToSignUpConfirm,
  navigateToSignUp,
  navigateToForgotPassword,
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
  getMeErrorMessage,
}) => {
  /**
   * JW: This is probably not the best way to set input focus on refs,
   * but works for now™
   */
  let passwordInput;
  const focusPassword = () => passwordInput.focus();

  return (
    <KeyboardAwareScrollView>
      <View testID="login-scroll-view" style={scene.content}>
        <Text testID="login-title" style={modal.title}>
          Login
        </Text>
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
            testID="login-email-input"
          />
          {error === 'username' && (
            <Text style={forms.error}>Please provide a valid email</Text>
          )}
        </View>
        <View style={forms.formGroup}>
          <Text style={forms.label}>Password</Text>
          <TextInput
            ref={el => (passwordInput = el)}
            style={[forms.input, focus === 'password' && forms.inputFocus]}
            onFocus={onPasswordFocus}
            onBlur={onBlur}
            onChangeText={onPasswordChange}
            value={password}
            secureTextEntry
            maxLength={50}
            placeholder="••••••••"
            placeholderTextColor={vars.blueGrey100}
            editable={!isInFlight}
            spellCheck={false}
            returnKeyType="go"
            onSubmitEditing={onSubmit}
            testID="login-password-input"
          />
          {error === 'password' && (
            <Text style={styles.error}>Please provide a password</Text>
          )}
        </View>
        {(error === 'credentials' || error === 'server') && (
          <View style={[wells.error, styles.wellError]}>
            <Text style={wells.errorText}>Invalid email or password</Text>
          </View>
        )}
        {getMeErrorMessage.length > 0 && (
          <View style={[wells.error, styles.wellError]}>
            <Text style={wells.errorText}>{getMeErrorMessage}</Text>
          </View>
        )}
        <View style={forms.buttonRow}>
          <View style={styles.submitContainer}>
            <Button
              onPress={onSubmit}
              containerViewStyle={buttons.container}
              buttonStyle={buttons.infoButton}
              textStyle={buttons.infoText}
              title={isInFlight ? 'Submitting…' : 'Submit'}
              disabled={isInFlight}
              testID="login-submit"
            />
          </View>
        </View>
        <View>
          <TouchableOpacity
            accessibilityLabel="Forgot your password"
            onPress={navigateToForgotPassword}
            style={styles.forgotPasswordButton}>
            <Text style={styles.forgotPasswordText}>Forgot your password?</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.noAccountTextContainer}>
          <Text style={scene.copy}>{"Don't have an account?"}</Text>
        </View>
        <View style={[forms.buttonRow, styles.noAccountButtonRow]}>
          <View style={styles.confirmCodeWrapper}>
            <Button
              onPress={navigateToSignUpConfirm}
              containerViewStyle={buttons.container}
              buttonStyle={buttons.secondarySkeletonButton}
              textStyle={buttons.secondarySkeletonText}
              title={'Confirm Code'}
            />
          </View>
          <View style={styles.signUpWrapper}>
            <Button
              testID="login-signup"
              onPress={navigateToSignUp}
              containerViewStyle={buttons.container}
              buttonStyle={buttons.infoSkeletonButton}
              textStyle={buttons.infoSkeletonText}
              title={'Sign Up'}
            />
          </View>
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
};
