const CURRENT_PASSWORD_ERRORS = {
  'no-current-password': 'Please provide your current password',
  'invalid-password': 'Please provide your current password',
};
const NEW_PASSWORD_ERRORS = {
  'no-new-password': 'Please provide a new password',
  'new-password-whitespace': 'Password can not contain empty spaces',
  'new-password-short': 'Passwords must be at least 8 characters',
};
const NEW_PASSWORD_AGAIN_ERRORS = { 'password-mismatch': 'Does not match' };
const ALL_RECOGNIZED_ERRORS = {
  ...CURRENT_PASSWORD_ERRORS,
  ...NEW_PASSWORD_ERRORS,
  ...NEW_PASSWORD_AGAIN_ERRORS,
};

const matchingValueOrEmptyString = (error, matchers) => matchers[error] || '';

export const getCurrentPasswordError = (error) =>
  matchingValueOrEmptyString(error, CURRENT_PASSWORD_ERRORS);

export const getNewPasswordError = (error) =>
  matchingValueOrEmptyString(error, NEW_PASSWORD_ERRORS);

export const getPasswordAgainError = (error) =>
  matchingValueOrEmptyString(error, NEW_PASSWORD_AGAIN_ERRORS);

export const getErrorIfUnrecognized = (error) =>
  ALL_RECOGNIZED_ERRORS[error] ? '' : error;
