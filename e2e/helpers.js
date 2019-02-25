/* eslint-disable import/prefer-default-export */
/* eslint-disable import/no-commonjs */
import uuidv1 from 'uuid/v1';
import Moniker from 'moniker';
import times from 'lodash/times';

import userApi from '../src/redux/user/user.api';
import loverRequestApi from '../src/redux/loverRequest/loverRequest.api';
import receivedLoverRequestsApi from '../src/redux/receivedLoverRequests/receivedLoverRequests.api';

export const generateUser = async () => {
  const uuid = uuidv1();
  const moniker = Moniker.choose();
  const [firstName, lastName] = moniker.split('-');
  const username = `${moniker}${uuid.substr(0, 5)}`;
  const email = `justin+${username}@luvup.io`;
  const password = uuid.substr(0, 8);

  await userApi.userRequest(email);
  const {
    body: {
      data: {
        confirmUser: {
          user: { id },
        },
      },
    },
  } = await userApi.confirmUser(
    email,
    username,
    firstName,
    lastName,
    '012345',
    password
  );

  return {
    id,
    firstName,
    lastName,
    username,
    email,
    password,
  };
};

const authId = async user => {
  const {
    body: { id_token },
  } = await userApi.login(user.email, user.password);
  return id_token;
};

export const generateRelationship = async () => {
  const promises = times(2, () => generateUser());
  const [user, lover] = await Promise.all(promises);

  const id_token = await authId(user);
  const loverIdToken = authId(lover);

  const {
    body: {
      data: { requestLover },
    },
  } = await loverRequestApi.requestLover(lover.id, id_token);

  await receivedLoverRequestsApi.acceptLoverRequest(
    requestLover.id,
    loverIdToken
  );

  return {
    user,
    lover,
  };
};

export const login = async (
  email = 'whayler1@bar.com',
  password = 'Testing1234'
) => {
  await element(by.id('login-email-input')).tap();
  await element(by.id('login-email-input')).typeText(`${email}\n${password}\n`);
};
