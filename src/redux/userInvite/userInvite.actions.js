import get from 'lodash/get';

import { getGraphQLError } from '../../helpers';
import userInviteApi from './userInvite.api';

export const GET_USER_INVITE_ATTEMPT = 'user-invite/get-user-invite-attempt';
export const GET_USER_INVITE_SUCCESS = 'user-invite/get-user-invite-success';
export const GET_USER_INVITE_FAILURE = 'user-invite/get-user-invite-failure';
export const GET_USER_INVITE_WITH_ID_ATTEMPT =
  'user-invite/get-user-invite-with-id-attempt';
export const GET_USER_INVITE_WITH_ID_SUCCESS =
  'user-invite/get-user-invite-with-id-success';
export const GET_USER_INVITE_WITH_ID_FAILURE =
  'user-invite/get-user-invite-with-id-failure';
export const RESEND_USER_INVITE_ATTEMPT =
  'user-invite/resend-user-invite-attempt';
export const RESEND_USER_INVITE_SUCCESS =
  'user-invite/resend-user-invite-success';
export const RESEND_USER_INVITE_FAILURE =
  'user-invite/resend-user-invite-failure';

export const getUserInvite = () => async dispatch => {
  dispatch({ type: GET_USER_INVITE_ATTEMPT });
  try {
    const res = await userInviteApi.getUserInvite();
    const errorMessage = getGraphQLError(res);

    if (errorMessage) {
      throw new Error(errorMessage);
    }
    const userInvite = get(res, 'body.data.userInvite.userInvite');
    dispatch({
      type: GET_USER_INVITE_SUCCESS,
      ...userInvite,
    });
  } catch (err) {
    dispatch({
      type: GET_USER_INVITE_FAILURE,
      errorMessage: err.message,
    });
  }
};

export const getUserInviteWithId = userInviteId => async dispatch => {
  dispatch({ type: GET_USER_INVITE_WITH_ID_ATTEMPT });
  try {
    const res = await userInviteApi.getUserInviteWithId();
    const errorMessage = getGraphQLError(res);

    if (errorMessage) {
      throw new Error(errorMessage);
    }
    const { userInvite, sender, loverRequest } = get(
      res,
      'body.data.userInviteWithId',
      {}
    );
    dispatch({
      type: GET_USER_INVITE_WITH_ID_SUCCESS,
      userInvite,
      sender,
      loverRequest,
    });
  } catch (err) {
    dispatch({
      type: GET_USER_INVITE_WITH_ID_FAILURE,
      errorMessage: err.message,
    });
  }
};

export const resendUserInvite = recipientEmail => async (
  dispatch,
  getState
) => {
  dispatch({ type: RESEND_USER_INVITE_ATTEMPT });
  try {
    const { id: userInviteId } = getState().userInvite;
    const res = await userInviteApi.resendUserInvite(
      userInviteId,
      recipientEmail
    );

    const graphQLError = getGraphQLError(res);

    if (graphQLError) {
      throw new Error(graphQLError);
    }
    dispatch({ type: RESEND_USER_INVITE_SUCCESS });
  } catch (err) {
    dispatch({
      type: RESEND_USER_INVITE_FAILURE,
      errorMessage: err.message,
    });
  }
};
