import superagent from 'superagent';
import { AsyncStorage } from 'react-native';

import config from '../../config';

export const SET_USER = 'user/set-user';
export const LOGIN = 'user/login';
export const LOGOUT = 'user/logout';
export const REAUTH = 'user/reauth';
export const USER_REQUEST = 'user/user-request';

// export const login = (username, password) => dispatch => {
//   console.log('login called');
// }

export const login = (username, password) => async dispatch => {
  console.log('-- login called');
  try {
    const res = await superagent.post(`${config.baseUrl}/login`, { username, password});
    console.log('got res', res.body);

    const {
      id,
      email,
      id_token,
      error,
    } = res.body;

    await AsyncStorage.setItem('id_token', res.body.id_token);

    dispatch({
      type: LOGIN,
      id,
      email,
      username,
    });
    return res.body;
  } catch (err) {
    console.log('login err', err);
    return err;
  }
};

export const logout = () => async dispatch => {
  await AsyncStorage.removeItem('id_token');
  dispatch({ type: LOGOUT });
  return;
}

export const reauth = id_token => async dispatch => {
  try {
    const res = await superagent.post(`${config.baseUrl}/reauth`, { id_token });
    console.log('reauth res', res);
    await AsyncStorage.setItem('id_token', res.body.id_token);
    const { id, username, email } = res.body.user;
    dispatch({
      type: REAUTH,
      id,
      username,
      email,
    });
    return res.body;
  } catch (err) {
    console.log('reauth err', err);
    return err;
  }
};

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

export const confirmUser = (email, username, code, password) => async () => {
  try {
    const res = await superagent.post(config.graphQlUrl, {
      query: `mutation {
        confirmUser(
          email: "${email}"
          username: "${username}"
          password: "${password}"
          code: ${code}
        ) {
          user {
            id
            email
            local {
              username
            }
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

export const setUser = (email, username='', id='') => ({
  type: SET_USER,
  id,
  email,
  username
});
