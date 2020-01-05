import React from 'react';
import { Text, View } from 'react-native';
import FormScene from '../../components/FormScene';
import Form, { FORM_VALIDATORS } from '../../components/Form';
import { scene } from '../../styles';

const getNewPasswordAgainValidator = (formState) => (value) =>
  formState.newPassword === value ? '' : 'Must match new password';

const getNewPasswordCanNotMatchCurrentPasswordValidator = (formState) => (
  value,
) =>
  formState.currentPassword !== value
    ? ''
    : 'New password can not match current password';

const ChangePassword = () => {
  function handleSubmit() {
    console.log('submit');
  }
  return (
    <FormScene>
      <Text style={[scene.titleCopy, scene.textCenter]}>Change Password</Text>
      <Form onSubmit={handleSubmit}>
        {({ renderInput, renderSubmit, formState }) => (
          <>
            {renderInput({
              label: 'Current Password',
              validators: FORM_VALIDATORS.PASSWORD_VALIDATORS,
              placeholder: 'Min 8 chars. No spaces',
              inputProps: {
                autoCapitalize: 'none',
                secureTextEntry: true,
                spellCheck: false,
                returnKeyType: 'next',
              },
            })}
            {renderInput({
              label: 'New Password',
              validators: [
                ...FORM_VALIDATORS.PASSWORD_VALIDATORS,
                getNewPasswordCanNotMatchCurrentPasswordValidator(formState),
              ],
              placeholder: 'Min 8 chars. No spaces',
              inputProps: {
                autoCapitalize: 'none',
                secureTextEntry: true,
                spellCheck: false,
                returnKeyType: 'next',
              },
            })}
            {renderInput({
              label: 'New Password Again',
              validators: [getNewPasswordAgainValidator(formState)],
              placeholder: 'Must match new password',
              inputProps: {
                autoCapitalize: 'none',
                secureTextEntry: true,
                spellCheck: false,
              },
            })}
            <View style={scene.gutterDoubleAndHalfTop}>
              {renderSubmit({
                title: 'Submit',
              })}
            </View>
          </>
        )}
      </Form>
    </FormScene>
  );
};

export default ChangePassword;
