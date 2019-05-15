import _ from 'lodash';
import {
  REQUEST_LOVER_SUCCESS,
  SET_LOVER_REQUEST,
  RESEND_LOVER_REQUEST_EMAIL_ATTEMPT,
  RESEND_LOVER_REQUEST_EMAIL_SUCCESS,
  RESEND_LOVER_REQUEST_EMAIL_FAILURE,
  CANCEL_LOVER_REQUEST_ATTEMPT,
  CANCEL_LOVER_REQUEST_SUCCESS,
  CANCEL_LOVER_REQUEST_FAILURE,
  CANCEL_SENT_LOVER_REQUEST_AND_RELATIONSHIP_ATTEMPT,
  CANCEL_SENT_LOVER_REQUEST_AND_RELATIONSHIP_SUCCESS,
  CANCEL_SENT_LOVER_REQUEST_AND_RELATIONSHIP_FAILURE,
  CLEAR_LOVER_REQUEST,
} from './loverRequest.actions';

const defaultLoverRequest = {
  id: '',
  isAccepted: '',
  isSenderCanceled: '',
  isRecipientCanceled: '',
  createdAt: '',
  username: '',
  firstName: '',
  lastName: '',
};

const defaultState = {
  ...defaultLoverRequest,
  isCancelLoverRequestInFlight: false,
  cancelLoverRequestError: '',
  isResendRequestEmailInFlight: false,
  resendLoverRequestEmailError: '',
  isCancelSentLoverRequestAndRelationshipInFlight: false,
  cancelSentLoverRequestAndRelationshipError: '',
};

export default function reducer(state = defaultState, action) {
  switch (action.type) {
    case REQUEST_LOVER_SUCCESS:
      return {
        ...state,
        ..._.pick(action.loverRequest, [
          'id',
          'isAccepted',
          'isSenderCanceled',
          'isRecipientCanceled',
          'createdAt',
          'username',
          'firstName',
          'lastName',
        ]),
      };
    case SET_LOVER_REQUEST:
      return {
        ...state,
        ..._.pick(action, [
          'id',
          'isAccepted',
          'isSenderCanceled',
          'isRecipientCanceled',
          'createdAt',
          'username',
          'firstName',
          'lastName',
        ]),
      };
    case RESEND_LOVER_REQUEST_EMAIL_ATTEMPT:
      return {
        ...state,
        isResendRequestEmailInFlight: true,
        resendLoverRequestEmailError: '',
      };
    case RESEND_LOVER_REQUEST_EMAIL_SUCCESS:
      return {
        ...state,
        isResendRequestEmailInFlight: false,
      };
    case RESEND_LOVER_REQUEST_EMAIL_FAILURE:
      return {
        ...state,
        isResendRequestEmailInFlight: false,
        resendLoverRequestEmailError: action.errorMessage,
      };
    case CANCEL_LOVER_REQUEST_ATTEMPT:
      return {
        ...state,
        isCancelLoverRequestInFlight: true,
        cancelLoverRequestError: '',
      };
    case CANCEL_LOVER_REQUEST_SUCCESS:
      return {
        ...state,
        ...defaultLoverRequest,
        isCancelLoverRequestInFlight: false,
      };
    case CANCEL_LOVER_REQUEST_FAILURE:
      return {
        ...state,
        isCancelLoverRequestInFlight: false,
        cancelLoverRequestError: action.errorMessage,
      };
    case CANCEL_SENT_LOVER_REQUEST_AND_RELATIONSHIP_ATTEMPT:
      return {
        ...state,
        isCancelSentLoverRequestAndRelationshipInFlight: true,
        cancelSentLoverRequestAndRelationshipError: '',
      };
    case CANCEL_SENT_LOVER_REQUEST_AND_RELATIONSHIP_SUCCESS:
      return {
        ...state,
        isCancelSentLoverRequestAndRelationshipInFlight: false,
        ...defaultLoverRequest,
      };
    case CANCEL_SENT_LOVER_REQUEST_AND_RELATIONSHIP_FAILURE:
      return {
        ...state,
        isCancelSentLoverRequestAndRelationshipInFlight: false,
        cancelSentLoverRequestAndRelationshipError: action.errorMessage,
      };
    case CLEAR_LOVER_REQUEST:
      return { ...defaultState };
    default:
      return state;
  }
}
