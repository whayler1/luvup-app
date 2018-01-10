import superagent from 'superagent';
import { AsyncStorage } from 'react-native';

import config from '../../config';

export const SET_USER = 'user/set-user';
export const LOGIN = 'user/login';
export const LOGOUT = 'user/logout';
export const REAUTH = 'user/reauth';

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

  } catch (err) {

  }
};

export const setUser = (id, email, username) => ({
  type: SET_USER,
  id,
  email,
  username
});
