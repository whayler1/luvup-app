/* eslint-disable import/prefer-default-export */
/* eslint-disable import/no-commonjs */
import uuidv1 from 'uuid/v1';
import Moniker from 'moniker';
import times from 'lodash/times';

import userApi from '../src/redux/user/user.api';

const generateUser = async () => {
  const uuid = uuidv1();
  const moniker = Moniker.choose();
  const [firstName, lastName] = moniker.split('-');
  const username = `${moniker}${uuid.substr(0, 5)}`;
  const email = `justin+${username}@luvup.io`;
  const password = uuid.substr(0, 8);

  await userApi.userRequest(email);
  await userApi.confirmUser(
    email,
    username,
    firstName,
    lastName,
    '012345',
    password
  );

  return {
    firstName,
    lastName,
    username,
    email,
    password,
  };
};

const generateRelationship = async () => {
  const promises = times(2, () => generateUser());
  const [user, lover] = await Promise.all(promises);
  console.log('\n\n -- user', user);

  const loginRes = await userApi.login(user.email, user.password);
  console.log('\n\n --- loginRes', loginRes.body.id_token);
};

const login = async (email = 'whayler1@bar.com', password = 'Testing1234') => {
  await element(by.id('login-email-input')).tap();
  await element(by.id('login-email-input')).typeText(`${email}\n${password}\n`);
};

module.exports = { generateUser, generateRelationship, login };
