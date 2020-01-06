import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Text, View } from 'react-native';

import FormScene from '../../components/FormScene';
import Form, { FORM_VALIDATORS } from '../../components/Form';
import Well from '../../components/Well';
import { scene, vars } from '../../styles';
import { isStringWithLength } from '../../helpers';
import { changePassword as changePasswordAction } from '../../redux/user/user.actions';
import {
  getCurrentPasswordError,
  getNewPasswordError,
  getPasswordAgainError,
  getErrorIfUnrecognized,
} from './ChangePassword.errorGetters';

const getNewPasswordAgainValidator = (formState) => (value) =>
  formState.newPassword === value ? '' : 'Must match new password';

const getNewPasswordCanNotMatchCurrentPasswordValidator = (formState) => (
  value,
) =>
  formState.currentPassword !== value
    ? ''
    : 'New password can not match current password';

const ChangePassword = ({
  isChangePasswordInFlight,
  changePasswordError,
  changePassword,
}) => {
  function handleSubmit({ currentPassword, newPassword }) {
    changePassword(currentPassword, newPassword);
  }
  const unrecognizedError = getErrorIfUnrecognized(changePasswordError);
  return (
    <FormScene>
      <Text style={[scene.titleCopy, scene.textCenter]}>Change Password</Text>
      <Form onSubmit={handleSubmit} isInFlight={isChangePasswordInFlight}>
        {({ renderInput, renderSubmit, formState }) => (
          <>
            {renderInput({
              label: 'Current Password',
              validators: FORM_VALIDATORS.PASSWORD_VALIDATORS,
              placeholder: 'Min 8 chars. No spaces',
              error: getCurrentPasswordError(changePasswordError),
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
              error: getNewPasswordError(changePasswordError),
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
              error: getPasswordAgainError(changePasswordError),
              inputProps: {
                autoCapitalize: 'none',
                secureTextEntry: true,
                spellCheck: false,
              },
            })}
            {isStringWithLength(unrecognizedError) && (
              <Well text={unrecognizedError} styles={scene.gutterAndHalfTop} />
            )}
            <View
              style={[
                scene.gutterDoubleAndHalfTop,
                { marginBottom: vars.gutterDouble },
              ]}
            >
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

ChangePassword.propTypes = {
  isChangePasswordInFlight: PropTypes.bool.isRequired,
  changePasswordError: PropTypes.string.isRequired,
  changePassword: PropTypes.func.isRequired,
};

export default connect(
  (state) => ({
    isChangePasswordInFlight: state.user.isChangePasswordInFlight,
    changePasswordError: state.user.changePasswordError,
  }),
  {
    changePassword: changePasswordAction,
  },
)(ChangePassword);
