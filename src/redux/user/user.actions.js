import { AsyncStorage } from 'react-native';
import _ from 'lodash';
import { Actions } from 'react-native-router-flux';
import {
  listen as listenToNotifications,
  remove as removeNotificationsListener,
} from '../../services/notifications';

import { clearCoinCount } from '../coin/coin.actions';
import { clearJalapenoCount } from '../jalapeno/jalapeno.actions';
import { clearReceivedLoverRequests } from '../receivedLoverRequests/receivedLoverRequests.actions';
import userApi from './user.api';
import { registerForPushNotifications } from '../../helpers';
import errorReporter from '../../services/errorReporter';
import appStateListener from '../../services/appStateListener';

export const SET_USER = 'user/set-user';
export const LOGIN_ATTEMPT = 'user/login-attempt';
export const LOGIN_SUCCESS = 'user/login-success';
export const LOGIN_FAILURE = 'user/login-failure';
export const LOGOUT = 'user/logout';
export const REAUTH_ATTEMPT = 'user/reauth-attempt';
export const REAUTH_SUCCESS = 'user/reauth-success';
export const REAUTH_FAILURE = 'user/reauth-failure';
export const SEND_NEW_PASSWORD_ATTEMPT = 'user/send-new-password-attempt';
export const SEND_NEW_PASSWORD_SUCCESS = 'user/send-new-password-success';
export const SEND_NEW_PASSWORD_FAILURE = 'user/send-new-password-failure';
export const RESET_PASSWORD_WITH_GENERATED_PASSWORD_ATTEMPT =
  'user/reset-password-with-generated-password-attempt';
export const RESET_PASSWORD_WITH_GENERATED_PASSWORD_SUCCESS =
  'user/reset-password-with-generated-password-success';
export const RESET_PASSWORD_WITH_GENERATED_PASSWORD_FAILURE =
  'user/reset-password-with-generated-password-failure';
export const USER_REQUEST_ATTEMPT = 'user/user-attempt';
export const USER_REQUEST_SUCCESS = 'user/user-success';
export const USER_REQUEST_FAILURE = 'user/user-failure';
export const CONFIRM_USER_REQUEST_CODE_ATTEMPT =
  'user/confirm-user-request-code-attempt';
export const CONFIRM_USER_REQUEST_CODE_SUCCESS =
  'user/confirm-user-request-code-success';
export const CONFIRM_USER_REQUEST_CODE_FAILURE =
  'user/confirm-user-request-code-failure';
export const CLEAR_CONFIRM_USER_REQUEST_FAILURE =
  'user/clear-confirm-user-request-failure';
export const CONFIRM_USER_REQUEST_ATTEMPT = 'user/confirm-user-request-attempt';
export const CONFIRM_USER_REQUEST_SUCCESS = 'user/confirm-user-request-success';
export const CONFIRM_USER_REQUEST_FAILURE = 'user/confirm-user-request-failure';
export const GET_ME_ATTEMPT = 'user/get-me-attempt';
export const GET_ME_SUCCESS = 'user/get-me-success';
export const GET_ME_FAILURE = 'user/get-me-failure';
export const GET_TIMELINE_DATA_ATTEMPT = 'user/get-timeline-data-attempt';
export const GET_TIMELINE_DATA_SUCCESS = 'user/get-timeline-data-success';
export const GET_TIMELINE_DATA_FAILURE = 'user/get-timeline-data-failure';

export const setGetMeSuccess = (data) => (dispatch) => {
  dispatch({
    type: GET_ME_SUCCESS,
    data,
  });
  Actions.replace('dashboard');
};

export const getMe = () => async (dispatch) => {
  dispatch({ type: GET_ME_ATTEMPT });
  try {
    const res = await userApi.getMe();

    const errorMessage = _.get(res, 'body.errors[0].message');
    if (errorMessage) {
      dispatch({
        type: GET_ME_FAILURE,
        errorMessage,
      });
      return;
    }

    const data = _.get(res, 'body.data');
    await AsyncStorage.setItem('getMeData', JSON.stringify(data));
    dispatch({
      type: GET_ME_SUCCESS,
      data,
    });
  } catch (err) {
    errorReporter.exception(err, {
      tags: {
        thunk: 'user.getMe',
      },
    });
    dispatch({
      type: GET_ME_FAILURE,
      errorMessage: err.message,
    });
    return err;
  }
};

export const login = (usernameOrEmail, password) => async (
  dispatch,
  getState,
) => {
  dispatch({ type: LOGIN_ATTEMPT });
  try {
    const res = await userApi.login(
      usernameOrEmail.toLowerCase().trim(),
      password.trim(),
    );

    if (res.ok) {
      await AsyncStorage.setItem('id_token', _.get(res, 'body.id_token', ''));
      await dispatch(getMe());
      const { getMeErrorMessage } = getState().user;
      if (getMeErrorMessage.length > 0) {
        errorReporter.message(`getMeError: ${getMeErrorMessage}`, {
          tags: {
            thunk: 'user.login',
          },
        });
        dispatch({
          type: LOGIN_FAILURE,
          message: `Error retrieving user data: ${getMeErrorMessage}`,
        });
        return;
      }

      if (getState().user.isReset) {
        Actions.resetPasswordWithGeneratedPassword({
          generatedPassword: password,
        });
        await registerForPushNotifications();
        listenToNotifications();
        dispatch({
          type: LOGIN_SUCCESS,
          id: res.body.user.id,
          email: res.body.user.email,
          username: res.body.user.username,
          isReset: res.body.user.isReset,
        });
        return;
      }

      Actions.replace('dashboard');
      await registerForPushNotifications();
      listenToNotifications();
      dispatch({
        type: LOGIN_SUCCESS,
        id: res.body.user.id,
        email: res.body.user.email,
        username: res.body.user.username,
        isReset: res.body.user.isReset,
      });
      return res;
    }
    dispatch({
      type: LOGIN_FAILURE,
      errorMessage: _.get(res, 'body.errors[0].message', 'Error logging in'),
    });
  } catch (err) {
    // JW: Commenting out because we reach here when a uname/pword is invalid.
    // Need to refactor backend so uname/pword gives a better error status code
    // and we only report exceptions when something actually goes wrong.
    // errorReporter.exception(err, {
    //   tags: {
    //     thunk: 'user.login',
    //   },
    // });
    dispatch({ type: LOGIN_FAILURE, errorMessage: err.message });
    return err;
  }
};

export const logout = () => async (dispatch) => {
  await AsyncStorage.multiRemove(['id_token', 'getMeData']);
  dispatch(clearReceivedLoverRequests());
  dispatch(clearCoinCount());
  dispatch(clearJalapenoCount());
  dispatch({ type: LOGOUT });
  removeNotificationsListener();
  Actions.replace('login');
};

export const reauth = (id_token) => async (dispatch, getState) => {
  dispatch({ type: REAUTH_ATTEMPT });
  try {
    await dispatch(getMe());
    const { getMeErrorMessage } = getState().user;
    if (getMeErrorMessage.length > 0) {
      errorReporter.message(`getMeError: ${getMeErrorMessage}`, {
        tags: {
          thunk: 'user.reauth',
        },
        extra: {
          id_token,
        },
      });
      dispatch({
        type: REAUTH_FAILURE,
        message: getMeErrorMessage,
      });
      return;
    }
    Actions.replace('dashboard');
    dispatch({ type: REAUTH_SUCCESS });
    appStateListener.start();
    await registerForPushNotifications();
    listenToNotifications();
  } catch (err) {
    errorReporter.exception(err, {
      tags: {
        thunk: 'user.reauth',
      },
      extra: {
        id_token,
      },
    });
    dispatch({
      type: REAUTH_FAILURE,
      message: _.get(err, 'message', 'Error connecting to Luvup'),
    });
  }
};

export const sendNewPassword = (email) => async (dispatch) => {
  dispatch({ type: SEND_NEW_PASSWORD_ATTEMPT });
  const defaultError = 'Error sending new password';
  try {
    const { body } = await userApi.sendNewPassword(email.toLowerCase().trim());

    if (body.errors) {
      return dispatch({
        type: SEND_NEW_PASSWORD_FAILURE,
        errorMessage: _.get(body, 'errors[0].message', defaultError),
      });
    }

    return dispatch({ type: SEND_NEW_PASSWORD_SUCCESS });
  } catch (error) {
    errorReporter.exception(error, {
      tags: {
        thunk: 'user.sendNewPassword',
      },
    });
    return dispatch({
      type: SEND_NEW_PASSWORD_FAILURE,
      errorMessage: _.get(error, 'message', defaultError),
    });
  }
};

export const resetPasswordWithGeneratedPassword = (
  generatedPassword,
  newPassword,
) => async (dispatch) => {
  dispatch({ type: RESET_PASSWORD_WITH_GENERATED_PASSWORD_ATTEMPT });
  const defaultError = 'Error resetting password';
  try {
    const { body } = await userApi.resetPasswordWithGeneratedPassword(
      generatedPassword,
      newPassword,
    );

    if (body.errors) {
      return dispatch({
        type: RESET_PASSWORD_WITH_GENERATED_PASSWORD_FAILURE,
        errorMessage: _.get(body, 'errors[0].message', defaultError),
      });
    }
    return dispatch({ type: RESET_PASSWORD_WITH_GENERATED_PASSWORD_SUCCESS });
  } catch (error) {
    errorReporter.exception(error, {
      tags: {
        thunk: 'user.resetPasswordWithGeneratedPassword',
      },
    });
    return dispatch({
      type: RESET_PASSWORD_WITH_GENERATED_PASSWORD_FAILURE,
      errorMessage: _.get(error, 'message', defaultError),
    });
  }
};

export const clearConfirmUserRequestFailure = () => ({
  type: CLEAR_CONFIRM_USER_REQUEST_FAILURE,
});

export const userRequest = (email) => async (dispatch) => {
  dispatch({ type: USER_REQUEST_ATTEMPT });

  try {
    const res = await userApi.userRequest(email);

    if (res.body.errors) {
      const errorMessage = _.get(
        res,
        'body.errors[0].message',
        'Http response not ok',
      );
      dispatch({ type: USER_REQUEST_FAILURE, errorMessage });
    }

    dispatch({
      type: USER_REQUEST_SUCCESS,
      email,
    });
    return res;
  } catch (err) {
    errorReporter.exception(err, {
      tags: {
        thunk: 'user.userRequest',
      },
    });
    dispatch({ type: USER_REQUEST_FAILURE, errorMessage: err.message });
    return err;
  }
};

const confirmUserLogin = async (email, password, dispatch, getState) => {
  await dispatch(login(email, password));
  const { loginError } = getState().user;
  if (loginError) {
    throw new Error(loginError);
  }
};

export const confirmUser = (
  email,
  username,
  firstName,
  lastName,
  code,
  password,
) => async (dispatch, getState) => {
  dispatch({ type: CONFIRM_USER_REQUEST_ATTEMPT });
  try {
    const confirmUserRes = await userApi.confirmUser(
      email,
      username,
      firstName,
      lastName,
      code,
      password,
    );

    const errorMessage = _.get(confirmUserRes, 'body.errors[0].message');

    if (errorMessage && !/^user request used/i.test(errorMessage)) {
      dispatch({
        type: CONFIRM_USER_REQUEST_FAILURE,
        errorMessage,
      });
      return;
    }

    await confirmUserLogin(email, password, dispatch, getState);

    dispatch({ type: CONFIRM_USER_REQUEST_SUCCESS });
  } catch (err) {
    errorReporter.exception(err, {
      tags: {
        thunk: 'user.confirmUser',
      },
    });
    dispatch({
      type: CONFIRM_USER_REQUEST_FAILURE,
      errorMessage: err.message,
    });
  }
};

export const setUser = (
  email,
  username = '',
  id = '',
  firstName = '',
  lastName = '',
) => ({
  type: SET_USER,
  id,
  email,
  username,
  firstName,
  lastName,
});

export const confirmUserRequestCode = (email, code) => async (dispatch) => {
  dispatch({ type: CONFIRM_USER_REQUEST_CODE_ATTEMPT });
  try {
    const res = await userApi.confirmUserRequestCode(email, code);
    const confirmUserRequestCode = _.get(
      res,
      'body.data.confirmUserRequestCode',
    );

    if (confirmUserRequestCode && confirmUserRequestCode.success) {
      Actions.confirmUserRequestCreateProfile();
      dispatch({
        type: CONFIRM_USER_REQUEST_CODE_SUCCESS,
        email,
        code,
      });
      return res;
    }

    dispatch({
      type: CONFIRM_USER_REQUEST_CODE_FAILURE,
      errorMessage: _.get(
        res,
        'body.errors[0].message',
        'Error submitting request code',
      ),
    });
    return res;
  } catch (err) {
    errorReporter.exception(err, {
      tags: {
        thunk: 'user.confirmUserRequestCode',
      },
    });
    dispatch({
      type: CONFIRM_USER_REQUEST_CODE_FAILURE,
      errorMessage: _.get(err, 'message', 'Error submitting request code'),
    });
    return err;
  }
};

export const clearUserRequestCodeError = () => ({
  type: CONFIRM_USER_REQUEST_CODE_FAILURE,
  errorMessage: '',
});

export const getTimelineData = (limit) => async (dispatch) => {
  dispatch({ type: GET_TIMELINE_DATA_ATTEMPT });

  try {
    const data = await userApi.getTimelineData(limit);

    const rows = _.get(data, 'userEvents.rows');

    if (_.isArray(rows)) {
      dispatch({
        type: GET_TIMELINE_DATA_SUCCESS,
        ..._.pick(data.userEvents, [
          'rows',
          'count',
          'loveNoteEvents',
          'loveNotes',
          'quizItemEvents',
          'quizItems',
        ]),
        coinCount: data.coinCount.count,
        jalapenosCount: data.jalapenos.count,
        sentCoinsCount: data.sentCoins.count,
        sentJalapenosCount: data.sentJalapenos.count,
        loverRelationshipScore: data.lover.relationshipScore.score,
        relationshipScores: data.relationshipScores,
      });
      return data;
    }
  } catch (err) {
    errorReporter.exception(err, {
      tags: {
        thunk: 'user.getTimelineData',
      },
    });
    dispatch({
      type: GET_TIMELINE_DATA_FAILURE,
      error: err.message,
    });
  }
};
