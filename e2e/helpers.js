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
  // console.log('confirmUserRes', confirmUserRes.body.data.confirmUser.user);

  return {
    id,
    firstName,
    lastName,
    username,
    email,
    password,
  };
};

export const generateRelationship = async () => {
  const promises = times(2, () => generateUser());
  const [user, lover] = await Promise.all(promises);

  const {
    body: { id_token },
  } = await userApi.login(user.email, user.password);
  const loverLoginRes = await userApi.login(lover.email, lover.password);
  const loverIdToken = loverLoginRes.body.id_token;

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
  await waitFor(element(by.id('login-title')).atIndex(0))
    .toBeVisible()
    .withTimeout(3000);
  await waitFor(element(by.id('login-email-input')).atIndex(0))
    .toBeVisible()
    .withTimeout(3000);
  await element(by.id('login-email-input'))
    .atIndex(0)
    .tap();
  await element(by.id('login-email-input'))
    .atIndex(0)
    .typeText(email);
  await element(by.id('login-password-input'))
    .atIndex(0)
    .tap();
  await element(by.id('login-password-input'))
    .atIndex(0)
    .typeText(password);
  await element(by.id('login-password-input'))
    .atIndex(0)
    .typeText('\n');
};

export const elementById = id => element(by.id(id)).atIndex(0);
export const elementByText = text => element(by.text(text)).atIndex(0);
export const waitForElement = (element, options = {}) =>
  waitFor(element)
    .toBeVisible()
    .withTimeout(options.timeout || 6000);
export const waitForElementById = (id, options) =>
  waitForElement(elementById(id), options);
