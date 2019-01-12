/* eslint-disable import/prefer-default-export */
/* eslint-disable import/no-commonjs */

const login = async (email = 'whayler1@bar.com', password = 'Testing1234') => {
  await element(by.id('login-email-input')).tap();
  await element(by.id('login-email-input')).typeText(`${email}\n${password}\n`);
};

module.exports = { login };
