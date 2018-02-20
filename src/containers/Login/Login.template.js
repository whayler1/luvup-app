import React from 'react';
import { View, Text, TextInput } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Button } from 'react-native-elements';
import styles from './Login.styles';
import { scene, forms, buttons, modal, vars } from '../../styles';

export default ({
  navigateToSignUpConfirm,
  navigateToSignUp,
  onSubmit,
  onUsernameChange,
  onPasswordChange,
  username,
  password,
  error,
  isInFlight,
}) => (
  <KeyboardAwareScrollView
    resetScrollToCoords={{ x: 0, y: 0 }}
    contentContainerStyle={scene.container}
    scrollEnabled={true}
  >
    <View
      style={scene.topNav}
    >
      <View style={scene.topNavContent}>
        <View
          style={{
            flex: 1,
            alignItems: 'center',
          }}
        >
          <Text
            style={{
              fontFamily: vars.fontVanity,
              color: vars.blueGrey700,
              fontSize: 30,
            }}
          >
            luvup
          </Text>
        </View>
      </View>
    </View>
    <View style={scene.content}>
      <Text style={modal.title}>Login</Text>
      {error === 'credentials' && <Text style={forms.error}>Invalid username or password</Text>}
      {error === 'server' && <Text style={forms.error}>Server error</Text>}
      <View style={forms.formGroup}>
        <Text style={forms.label}>Email</Text>
        <TextInput
          style={forms.input}
          onChangeText={onUsernameChange}
          value={username}
          maxLength={50}
          placeholder="jane.doe@email.com"
          placeholderTextColor={vars.blueGrey100}
          autoCapitalize={'none'}
          editable={!isInFlight}
          spellCheck={false}
        />
        {error === 'username' && <Text style={forms.error}>Please provide a valid email</Text>}
      </View>
      <View style={forms.formGroup}>
        <Text style={forms.label}>Password</Text>
        <TextInput
          style={forms.input}
          onChangeText={onPasswordChange}
          value={password}
          secureTextEntry={true}
          maxLength={50}
          placeholder="••••••••"
          placeholderTextColor={vars.blueGrey100}
          editable={!isInFlight}
          spellCheck={false}
        />
        {error === 'password' && <Text style={styles.error}>Please provide a password</Text>}
      </View>
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
  </KeyboardAwareScrollView>
);
