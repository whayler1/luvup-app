import get from 'lodash/get';

import relationshipApi from './relationship.api';
import { sanitizeEmail } from '../../helpers';

export const SET_RELATIONSHIP = 'relationship/set-relationship';
export const END_RELATIONSHIP = 'relationship/end-relationship';
export const CLEAR_RELATIONSHIP = 'relationship/clear-relationship';
export const CREATE_RELATIONSHIP_WITH_INVITE_ATTEMPT =
  'relationship/create-relationship-with-invite-attempt';
export const CREATE_RELATIONSHIP_WITH_INVITE_SUCCESS =
  'relationship/create-relationship-with-invite-success';
export const CREATE_RELATIONSHIP_WITH_INVITE_FAILURE =
  'relationship/create-relationship-with-invite-failure';

export const setRelationship = (id, createdAt) => dispatch => {
  dispatch({ type: SET_RELATIONSHIP, id, createdAt });
};

export const endRelationship = () => async dispatch => {
  try {
    const res = await relationshipApi.endRelationship();

    dispatch({ type: END_RELATIONSHIP });

    return res;
  } catch (err) {
    return err;
  }
};

export const clearRelationship = () => ({ type: CLEAR_RELATIONSHIP });

export const createRelationshipWithInvite = (
  unsanitizedRecipientEmail,
  unsanitizedRecipientFirstName,
  unsanitizedRecipientLastName
) => async dispatch => {
  dispatch({ type: CREATE_RELATIONSHIP_WITH_INVITE_ATTEMPT });
  const recipientEmail = sanitizeEmail(unsanitizedRecipientEmail);
  const recipientFirstName = unsanitizedRecipientFirstName.trim();
  const recipientLastName = unsanitizedRecipientLastName.trim();
  try {
    const res = await relationshipApi.createRelationshipWithInvite(
      recipientEmail,
      recipientFirstName,
      recipientLastName
    );

    const errorMessage = get(res, 'body.errors[0].message');

    if (errorMessage) {
      dispatch({
        type: CREATE_RELATIONSHIP_WITH_INVITE_FAILURE,
        errorMessage,
      });
      return;
    }
    const {
      loverRequest,
      relationship,
      userInvite,
    } = res.body.data.createRelationshipWithInvite;
    dispatch({
      type: CREATE_RELATIONSHIP_WITH_INVITE_SUCCESS,
      loverRequest,
      relationship,
      userInvite,
    });
  } catch (err) {
    dispatch({
      type: CREATE_RELATIONSHIP_WITH_INVITE_FAILURE,
      errorMessage: err.message,
    });
  }
};
