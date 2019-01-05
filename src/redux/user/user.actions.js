import superagent from 'superagent';
import { AsyncStorage } from 'react-native';
import _ from 'lodash';
import {
  listen as listenToNotifications,
  remove as removeNotificationsListener,
} from '../../services/notifications';

import config from '../../config';
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
import graphQlRequest from '../../helpers/graphQlRequest';

export const SET_USER = 'user/set-user';
export const LOGIN = 'user/login';
export const LOGOUT = 'user/logout';
export const REAUTH = 'user/reauth';
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
    const res = await superagent.post(`${config.baseUrl}/login`, {
      username: usernameOrEmail,
      password,
    });

    await AsyncStorage.setItem('id_token', res.body.id_token);

    dispatch({
      type: LOGIN,
      id: res.body.user.id,
      email: res.body.user.email,
      username: res.body.user.username,
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
    const res = await superagent.post(`${config.baseUrl}/reauth`, { id_token });

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

export const getMe = () => async dispatch => {
  dispatch({ type: GET_ME_ATTEMPT });
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
        receivedLoveNotes(
          limit: 2,
          offset: 0,
          isRead: false,
        ) {
          rows { id, createdAt, isRead, note }
          count
        }
        relationshipScores(limit: 1) {
          rows {
            score
          }
        }
      }`,
    });

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
    const res = await superagent.post(config.graphQlUrl, {
      query: `mutation {
        userRequest( email: "${email}") {
          email error
        }
      }`,
    });

    if (!res.ok) {
      const errorMessage = _.get(res, 'error.message', 'Http response not ok');
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
      }`,
    });

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
    const data = await graphQlRequest(`{
      userEvents(
        limit: ${limit}
        offset: 0
      ) {
        rows {
          id isViewed createdAt name
        }
        count
        loveNoteEvents {
          id loveNoteId userEventId
        }
        loveNotes {
          id note createdAt isRead senderId recipientId numLuvups numJalapenos
        }
        quizItemEvents {
          id quizItemId userEventId
        }
        quizItems {
          id senderId recipientId question senderChoiceId recipientChoiceId reward createdAt
          choices { id answer }
        }
      }
      sentCoins(limit: 0) { count }
      sentJalapenos(limit: 0) { count }
    }`);

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
        sentCoinsCount: data.sentCoins.count,
        sentJalapenosCount: data.sentJalapenos.count,
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
