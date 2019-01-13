/* eslint-disable import/prefer-default-export */
/* eslint-disable import/no-commonjs */
import uuidv1 from 'uuid/v1';
import Moniker from 'moniker';

import userApi from '../src/redux/user/user.api';

const generateUser = async () => {
  const uuid = uuidv1();
  const moniker = Moniker.choose();
  const [firstName, lastName] = moniker.split('-');
  const username = `${moniker}${uuid.substr(0, 5)}`;
  const email = `justin+${username}@luvup.io`;

  const userReq = await userApi.userRequest(email);
  console.log('\n\n ---userReq---\n', userReq.body.data);
  const confirmUserReq = await userApi.confirmUser(
    email,
    username,
    firstName,
    lastName,
    '012345',
    'Testing123'
  );
  console.log(
    '\n\nconfirmUserReq',
    confirmUserReq.body.data.confirmUserRequestCode
  );

  return {
    firstName,
    lastName,
    username,
    email,
  };
};

const login = async (email = 'whayler1@bar.com', password = 'Testing1234') => {
  await element(by.id('login-email-input')).tap();
  await element(by.id('login-email-input')).typeText(`${email}\n${password}\n`);
};

module.exports = { generateUser, login };
