import superagent from 'superagent';
import { AsyncStorage } from 'react-native';
import _ from 'lodash';

import config from '../../config';
import { setLover } from '../lover/lover.actions';
import { SET_LOVER_REQUEST } from '../loverRequest/loverRequest.actions';
import { setRelationship } from '../relationship/relationship.actions';
import { setSentCoins, setUnviewedCoinCount } from '../coin/coin.actions';
import { setSentJalapenos, setUnviewedJalapenoCount } from '../jalapeno/jalapeno.actions';
import { setReceivedLoverRequests } from '../receivedLoverRequests/receivedLoverRequests.actions';

export const SET_USER = 'user/set-user';
export const LOGIN = 'user/login';
export const LOGOUT = 'user/logout';
export const REAUTH = 'user/reauth';
export const USER_REQUEST = 'user/user-request';
export const CONFIRM_USER_REQUEST_CODE = 'user/confirm-user-request-code';

export const login = (usernameOrEmail, password) => async dispatch => {
  try {
    const res = await superagent.post(`${config.baseUrl}/login`, { username: usernameOrEmail, password });

    await AsyncStorage.setItem('id_token', res.body.id_token);

    dispatch({
      type: LOGIN,
      id: res.body.user.id,
      email: res.body.user.email,
      username: res.body.user.username,
    });
    return res;
  } catch (err) {
    console.log('login err', err);
    return err;
  }
};

export const logout = () => async dispatch => {
  await AsyncStorage.removeItem('id_token');
  dispatch({ type: LOGOUT });
  return true;
}

export const reauth = id_token => async dispatch => {
  try {
    const res = await superagent.post(`${config.baseUrl}/reauth`, { id_token });
    await AsyncStorage.setItem('id_token', res.body.id_token);
    const { id, username, email } = res.body.user;
    dispatch({
      type: REAUTH,
      id,
      username,
      email,
    });
    console.log('\n\nreauth success!');
    return res.body;
  } catch (err) {
    console.log('reauth err', err);
    return err;
  }
};

export const getMe = () => async dispatch => {
  try {
    const res = await superagent.post(config.graphQlUrl, {
      query: `{
        me {
          id username email firstName lastName
          relationship {
            id createdAt
            lovers {
              id username firstName lastName
            }
          }
        }
        activeLoverRequest {
          loverRequest {
            id isAccepted isSenderCanceled isRecipientCanceled createdAt
            recipient {
              username firstName lastName
            }
          }
        }
        receivedLoverRequests {
          rows {
            id
            sender {
              id email firstName lastName
            }
          }
          count
        }
        sentCoins(limit: ${config.maxItemsPerHour}) {
          rows {
            id createdAt isUsed
          }
          count
        }
        sentJalapenos(limit: ${config.maxItemsPerHour}) {
          rows {
            id createdAt isExpired
          }
          count
        }
        unviewedEventCounts {
          coinsReceived jalapenosReceived
        }
      }`
    });

    const {
      email,
      username,
      id,
      firstName,
      lastName,
      relationship,
    } = res.body.data.me;

    dispatch(setUser(
      email,
      username,
      id,
      firstName,
      lastName,
    ));

    console.log('\n\n getme dispatch setUser', {
      email,
      username,
      id,
      firstName,
      lastName,
    });

    if (relationship) {
      dispatch(setRelationship(relationship.id, relationship.createdAt));

      const lover = relationship.lovers[0];
      console.log('\n\nlover', lover);
      if (lover) {
        dispatch(setLover(lover.id, lover.username, lover.firstName, lover.lastName));
      }
    }

    const receivedLoverRequests = _.get(res, 'body.data.receivedLoverRequests');
    if (receivedLoverRequests) {
      dispatch(setReceivedLoverRequests(
        receivedLoverRequests.rows,
        receivedLoverRequests.count
      ));
    }

    if (_.get(res, 'body.data.activeLoverRequest.loverRequest')) {
      const { loverRequest } = res.body.data.activeLoverRequest;

      if (loverRequest) {
        dispatch({
          type: SET_LOVER_REQUEST,
          ..._.pick(loverRequest, [
            'id',
            'isAccepted',
            'isSenderCanceled',
            'isRecipientCanceled',
            'createdAt',
          ]),
          ..._.pick(loverRequest.recipient, [
            'username',
            'firstName',
            'lastName',
          ]),
        });
      }
    }
    if (_.at(res, 'body.data.sentCoins')[0]) {
      const { sentCoins } = res.body.data;
      dispatch(setSentCoins(
        sentCoins.rows,
        sentCoins.count,
      ));
    }
    if (_.at(res, 'body.data.sentJalapenos')[0]) {
      const { sentJalapenos } = res.body.data;
      dispatch(setSentJalapenos(
        sentJalapenos.rows,
        sentJalapenos.count,
      ));
    }
    if (_.at(res, 'body.data.unviewedEventCounts')[0]) {
      const { unviewedEventCounts } = res.body.data;
      dispatch(setUnviewedCoinCount(
        unviewedEventCounts.coinsReceived
      ));
      dispatch(setUnviewedJalapenoCount(
        unviewedEventCounts.jalapenosReceived
      ));
    }
    return res;
  } catch (err) {
    console.log('getMe error', err);
    return err;
  }
}

export const userRequest = email => async dispatch => {
  try {
    const res = await superagent.post(config.graphQlUrl, {
      query: `mutation {
        userRequest( email: "${email}") {
          email error
        }
      }`
    });

    dispatch({
      type: USER_REQUEST,
      email,
    });

    return res;
  } catch (err) {
    return err;
  }
}

export const confirmUser = (email, username, firstName, lastName, code, password) => async () => {
  try {
    const res = await superagent.post(config.graphQlUrl, {
      query: `mutation {
        confirmUser(
          email: "${email}"
          username: "${username}"
          firstName: "${firstName}"
          lastName: "${lastName}"
          password: "${password}"
          code: "${code}"
        ) {
          user {
            id
            email
            username
            firstName
            lastName
          }
          error
        }
      }`
    });

    return res;
  } catch (err) {
    return err;
  }
};

export const setUser = (email, username='', id='', firstName='', lastName='') => ({
  type: SET_USER,
  id,
  email,
  username,
  firstName,
  lastName,
});

export const confirmUserRequestCode = (email, code) => async dispatch => {
  try {
    const res = await superagent.post(config.graphQlUrl, {
      query: `mutation {
        confirmUserRequestCode (
          email: "${email}"
          code: "${code}"
        ) {
          success error
        }
      }`,
    });
    console.log('res', res.body);

    const confirmUserRequestCode = _.at(res, 'body.data.confirmUserRequestCode')[0];
    console.log({ confirmUserRequestCode});

    if (confirmUserRequestCode && confirmUserRequestCode.success) {
      console.log('dispatch!!!');
      dispatch({
        type: CONFIRM_USER_REQUEST_CODE,
        email,
        code,
      });
    }

    return res;
  } catch (err) {
    console.log('confirmUserRequestCode err', err);
    return err;
  }
};
