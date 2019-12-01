import get from 'lodash/get';
import pick from 'lodash/pick';
import {
  REQUEST_LOVER_SUCCESS,
  SET_LOVER_REQUEST,
  RESEND_LOVER_REQUEST_EMAIL_ATTEMPT,
  RESEND_LOVER_REQUEST_EMAIL_SUCCESS,
  RESEND_LOVER_REQUEST_EMAIL_FAILURE,
  CANCEL_LOVER_REQUEST_ATTEMPT,
  CANCEL_LOVER_REQUEST_SUCCESS,
  CANCEL_LOVER_REQUEST_FAILURE,
  CREATE_LOVER_REQUEST_AND_RELATIONSHIP_AND_PLACEHOLDER_LOVER_ATTEMPT,
  CREATE_LOVER_REQUEST_AND_RELATIONSHIP_AND_PLACEHOLDER_LOVER_SUCCESS,
  CREATE_LOVER_REQUEST_AND_RELATIONSHIP_AND_PLACEHOLDER_LOVER_FAILURE,
  CANCEL_SENT_LOVER_REQUEST_AND_RELATIONSHIP_ATTEMPT,
  CANCEL_SENT_LOVER_REQUEST_AND_RELATIONSHIP_SUCCESS,
  CANCEL_SENT_LOVER_REQUEST_AND_RELATIONSHIP_FAILURE,
  GET_LOVER_REQUEST_ATTEMPT,
  GET_LOVER_REQUEST_SUCCESS,
  GET_LOVER_REQUEST_FAILURE,
} from './loverRequest.actions';
import { LOGOUT, GET_ME_SUCCESS } from '../user/user.actions';

const defaultLoverRequest = {
  isGetLoverRequestInFlight: false,
  getLoverRequestError: '',
  id: '',
  isAccepted: '',
  isSenderCanceled: '',
  isRecipientCanceled: '',
  createdAt: '',
  username: '',
  firstName: '',
  lastName: '',
};

const loverRequestKeys = Object.keys(defaultLoverRequest);

const defaultState = {
  ...defaultLoverRequest,
  isCancelLoverRequestInFlight: false,
  cancelLoverRequestError: '',
  isResendRequestEmailInFlight: false,
  resendLoverRequestEmailError: '',
  isCancelSentLoverRequestAndRelationshipInFlight: false,
  cancelSentLoverRequestAndRelationshipError: '',
  isCreateLoverRequestAndRelationshipAndPlaceholderLoverInFlight: false,
  createLoverRequestAndRelationshipAndPlaceholderLoverError: '',
};

export default function reducer(state = defaultState, action) {
  switch (action.type) {
    case CREATE_LOVER_REQUEST_AND_RELATIONSHIP_AND_PLACEHOLDER_LOVER_ATTEMPT:
      return {
        ...state,
        isCreateLoverRequestAndRelationshipAndPlaceholderLoverInFlight: true,
        createLoverRequestAndRelationshipAndPlaceholderLoverError: '',
      };
    case CREATE_LOVER_REQUEST_AND_RELATIONSHIP_AND_PLACEHOLDER_LOVER_SUCCESS:
    case REQUEST_LOVER_SUCCESS:
      return {
        ...state,
        isCreateLoverRequestAndRelationshipAndPlaceholderLoverInFlight: false,
        ...pick(action.loverRequest, loverRequestKeys),
      };
    case CREATE_LOVER_REQUEST_AND_RELATIONSHIP_AND_PLACEHOLDER_LOVER_FAILURE:
      return {
        ...state,
        isCreateLoverRequestAndRelationshipAndPlaceholderLoverInFlight: false,
        createLoverRequestAndRelationshipAndPlaceholderLoverError:
          action.errorMessage,
      };
    case SET_LOVER_REQUEST:
      return {
        ...state,
        ...pick(action, loverRequestKeys),
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
    case GET_LOVER_REQUEST_ATTEMPT:
      return {
        ...state,
        isGetLoverRequestInFlight: true,
        getLoverRequestError: '',
      };
    case GET_LOVER_REQUEST_SUCCESS:
      return {
        ...state,
        isGetLoverRequestInFlight: false,
        id: action.id,
        isAccepted: action.isAccepted,
        isSenderCanceled: action.isSenderCanceled,
        isRecipientCanceled: action.isRecipientCanceled,
        createdAt: action.createdAt,
      };
    case GET_LOVER_REQUEST_FAILURE:
      return {
        ...state,
        isGetLoverRequestInFlight: false,
        getLoverRequestError: action.errorMessage,
      };
    case GET_ME_SUCCESS: {
      const loverRequest = get(action.data, 'activeLoverRequest.loverRequest');
      if (loverRequest) {
        return {
          ...state,
          ...pick(loverRequest, [
            'id',
            'isAccepted',
            'isSenderCanceled',
            'isRecipientCanceled',
            'createdAt',
          ]),
          ...pick(loverRequest.recipient, [
            'username',
            'firstName',
            'lastName',
          ]),
        };
      }
      return state;
    }
    case LOGOUT:
      return { ...defaultState };
    default:
      return state;
  }
}
