/* eslint-disable import/prefer-default-export */
/* eslint-disable import/no-commonjs */

const login = async () => {
  await element(by.id('login-email-input')).tap();
  await element(by.id('login-email-input')).typeText(
    'whayler1+bar@gmail.com\nTesting1234\n'
  );
};

module.exports = { login };
