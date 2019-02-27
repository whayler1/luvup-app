import { AsyncStorage } from 'react-native';
import _ from 'lodash';
import {
  listen as listenToNotifications,
  remove as removeNotificationsListener,
} from '../../services/notifications';

import { setLover, clearLover } from '../lover/lover.actions';
import {
  SET_LOVER_REQUEST,
  clearLoverRequest,
} from '../loverRequest/loverRequest.actions';
import {
  setRelationship,
  clearRelationship,
} from '../relationship/relationship.actions';
import {
  setSentCoins,
  setUnviewedCoinCount,
  clearCoinCount,
} from '../coin/coin.actions';
import {
  setSentJalapenos,
  setUnviewedJalapenoCount,
  clearJalapenoCount,
} from '../jalapeno/jalapeno.actions';
import {
  setReceivedLoverRequests,
  clearReceivedLoverRequests,
} from '../receivedLoverRequests/receivedLoverRequests.actions';
import userApi from './user.api';

export const SET_USER = 'user/set-user';
export const LOGIN = 'user/login';
export const LOGOUT = 'user/logout';
export const REAUTH = 'user/reauth';
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
export const CONFIRM_USER_REQUEST_CODE = 'user/confirm-user-request-code';
export const GET_ME_ATTEMPT = 'user/get-me-attempt';
export const GET_ME_SUCCESS = 'user/get-me-success';
export const GET_ME_FAILURE = 'user/get-me-failure';
export const GET_TIMELINE_DATA_ATTEMPT = 'user/get-timeline-data-attempt';
export const GET_TIMELINE_DATA_SUCCESS = 'user/get-timeline-data-success';
export const GET_TIMELINE_DATA_FAILURE = 'user/get-timeline-data-failure';

export const login = (usernameOrEmail, password) => async dispatch => {
  try {
    const res = await userApi.login(usernameOrEmail, password);

    await AsyncStorage.setItem('id_token', res.body.id_token);

    dispatch({
      type: LOGIN,
      id: res.body.user.id,
      email: res.body.user.email,
      username: res.body.user.username,
      isReset: res.body.user.isReset,
    });
    listenToNotifications();
    return res;
  } catch (err) {
    return err;
  }
};

export const logout = () => async dispatch => {
  await AsyncStorage.removeItem('id_token');
  dispatch(clearLover());
  dispatch(clearLoverRequest());
  dispatch(clearReceivedLoverRequests());
  dispatch(clearRelationship());
  dispatch(clearCoinCount());
  dispatch(clearJalapenoCount());
  dispatch({ type: LOGOUT });
  removeNotificationsListener();
  return true;
};

export const reauth = id_token => async dispatch => {
  try {
    const res = await userApi.reauth(id_token);

    await AsyncStorage.setItem('id_token', res.body.id_token);

    const { id, username, email } = res.body.user;
    dispatch({
      type: REAUTH,
      id,
      username,
      email,
    });
    listenToNotifications();
    return res.body;
  } catch (err) {
    return err;
  }
};

export const sendNewPassword = email => async dispatch => {
  dispatch({ type: SEND_NEW_PASSWORD_ATTEMPT });
  const defaultError = 'Error sending new password';
  try {
    const { body } = await userApi.sendNewPassword(email);

    if (body.errors) {
      return dispatch({
        type: SEND_NEW_PASSWORD_FAILURE,
        errorMessage: _.get(body, 'errors[0].message', defaultError),
      });
    }

    return dispatch({ type: SEND_NEW_PASSWORD_SUCCESS });
  } catch (error) {
    return dispatch({
      type: SEND_NEW_PASSWORD_FAILURE,
      errorMessage: _.get(error, 'message', defaultError),
    });
  }
};

export const resetPasswordWithGeneratedPassword = (
  generatedPassword,
  newPassword
) => async dispatch => {
  dispatch({ type: RESET_PASSWORD_WITH_GENERATED_PASSWORD_ATTEMPT });
  const defaultError = 'Error resetting password';
  try {
    const { body } = await userApi.resetPasswordWithGeneratedPassword(
      generatedPassword,
      newPassword
    );

    if (body.errors) {
      return dispatch({
        type: RESET_PASSWORD_WITH_GENERATED_PASSWORD_FAILURE,
        errorMessage: _.get(body, 'errors[0].message', defaultError),
      });
    }
    return dispatch({ type: RESET_PASSWORD_WITH_GENERATED_PASSWORD_SUCCESS });
  } catch (error) {
    return dispatch({
      type: RESET_PASSWORD_WITH_GENERATED_PASSWORD_FAILURE,
      errorMessage: _.get(error, 'message', defaultError),
    });
  }
};

export const getMe = () => async dispatch => {
  dispatch({ type: GET_ME_ATTEMPT });
  try {
    const res = await userApi.getMe();

    const { relationship } = res.body.data.me;

    if (relationship) {
      dispatch(setRelationship(relationship.id, relationship.createdAt));

      const lover = relationship.lovers[0];

      if (lover) {
        dispatch(
          setLover(lover.id, lover.username, lover.firstName, lover.lastName)
        );
      }
    }

    const receivedLoverRequests = _.get(res, 'body.data.receivedLoverRequests');
    if (receivedLoverRequests) {
      dispatch(
        setReceivedLoverRequests(
          receivedLoverRequests.rows,
          receivedLoverRequests.count
        )
      );
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
      dispatch(setSentCoins(sentCoins.rows, sentCoins.count));
    }
    if (_.at(res, 'body.data.sentJalapenos')[0]) {
      const { sentJalapenos } = res.body.data;
      dispatch(setSentJalapenos(sentJalapenos.rows, sentJalapenos.count));
    }
    if (_.at(res, 'body.data.unviewedEventCounts')[0]) {
      const { unviewedEventCounts } = res.body.data;
      dispatch(setUnviewedCoinCount(unviewedEventCounts.coinsReceived));
      dispatch(setUnviewedJalapenoCount(unviewedEventCounts.jalapenosReceived));
    }
    const data = _.get(res, 'body.data');
    if (data) {
      dispatch({
        type: GET_ME_SUCCESS,
        data,
      });
    }
    return res;
  } catch (err) {
    dispatch({
      type: GET_ME_FAILURE,
      errorMessage: err.message,
    });
    return err;
  }
};

export const userRequest = email => async dispatch => {
  dispatch({ type: USER_REQUEST_ATTEMPT });

  try {
    const res = await userApi.userRequest(email);

    if (res.body.errors) {
      const errorMessage = _.get(
        res,
        'body.errors[0].message',
        'Http response not ok'
      );
      dispatch({ type: USER_REQUEST_FAILURE, errorMessage });
      return errorMessage;
    }

    dispatch({
      type: USER_REQUEST_SUCCESS,
      email,
    });
    return res;
  } catch (err) {
    dispatch({ type: USER_REQUEST_FAILURE, errorMessage: err.message });
    return err;
  }
};

export const confirmUser = (
  email,
  username,
  firstName,
  lastName,
  code,
  password
) => async () => {
  try {
    const res = await userApi.confirmUser(
      email,
      username,
      firstName,
      lastName,
      code,
      password
    );

    return res;
  } catch (err) {
    return err;
  }
};

export const setUser = (
  email,
  username = '',
  id = '',
  firstName = '',
  lastName = ''
) => ({
  type: SET_USER,
  id,
  email,
  username,
  firstName,
  lastName,
});

export const confirmUserRequestCode = (email, code) => async dispatch => {
  try {
    const res = await userApi.confirmUserRequestCode(email, code);

    const confirmUserRequestCode = _.at(
      res,
      'body.data.confirmUserRequestCode'
    )[0];

    if (confirmUserRequestCode && confirmUserRequestCode.success) {
      dispatch({
        type: CONFIRM_USER_REQUEST_CODE,
        email,
        code,
      });
    }

    return res;
  } catch (err) {
    return err;
  }
};

export const getTimelineData = limit => async dispatch => {
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
    dispatch({
      type: GET_TIMELINE_DATA_FAILURE,
      error: err.message,
    });
  }
};
