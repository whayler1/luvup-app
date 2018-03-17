import { Actions } from 'react-native-router-flux';
import _ from 'lodash';

import store from '../redux';
import { getMe } from '../redux/user/user.actions';

export const emailRegex = /\S+@\S+\.\S+/;

export const userLoginRouteSwitch = async () => {
  const res = await store.dispatch(getMe());

  const state = store.getState();
  const relationshipId = state.relationship.id;
  const loverRequestId = state.loverRequest.id;
  const receivedLoverRequests = state.receivedLoverRequests.rows;
  console.log('\n\n------\n',{receivedLoverRequests});

  if (!('body' in res)) {
    Actions.login();
  } else if (relationshipId || loverRequestId) {
    console.log('goto dashboard');
    Actions.dashboard();
  } else if (_.isArray(receivedLoverRequests) && receivedLoverRequests.length > 0) {
    //show received lover request
    Actions.confirmLoverRequest();
  } else {
    Actions.createloverrequest();
  }
};
