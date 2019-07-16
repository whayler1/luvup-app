import { emailRegex } from '../../helpers';

const FORM_VALIDATORS = {};

const EMAIL_REGEX_VALIDATOR = value =>
  emailRegex.test(value) ? '' : 'Please provide a valid email';

FORM_VALIDATORS.EMAIL_VALIDATORS = [EMAIL_REGEX_VALIDATOR];

export default FORM_VALIDATORS;
