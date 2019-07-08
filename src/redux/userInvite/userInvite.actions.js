import get from 'lodash/get';
import userInviteApi from './userInvite.api';

export const GET_USER_INVITE_ATTEMPT = 'user-invite/get-user-invite-attempt';
export const GET_USER_INVITE_SUCCESS = 'user-invite/get-user-invite-success';
export const GET_USER_INVITE_FAILURE = 'user-invite/get-user-invite-failure';

export const getUserInvite = () => async dispatch => {
  dispatch({ type: GET_USER_INVITE_ATTEMPT });
  try {
    const res = await userInviteApi.getUserInvite();

    const errorMessage = get(res, 'body.errors[0].message');

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
