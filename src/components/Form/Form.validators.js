import { emailRegex } from '../../helpers';

const FORM_VALIDATORS = {};

const EMAIL_REGEX_VALIDATOR = (value) =>
  emailRegex.test(value) ? '' : 'Please provide a valid email';

const PASSWORD_REGEX_VALIDATOR = (value) =>
  /^\S{8,}/.test(value)
    ? ''
    : 'Password must be at least 8 characters and can not contain empty spaces';

FORM_VALIDATORS.EMAIL_VALIDATORS = [EMAIL_REGEX_VALIDATOR];

FORM_VALIDATORS.PASSWORD_VALIDATORS = [PASSWORD_REGEX_VALIDATOR];

export default FORM_VALIDATORS;
