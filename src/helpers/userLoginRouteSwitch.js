import { Actions } from 'react-native-router-flux';
import _ from 'lodash';

import store from '../redux';
import { getMe } from '../redux/user/user.actions';
import analytics from '../services/analytics';

const indentifyUser = user =>
  analytics.identify({
    userId: user.id,
    traits: {
      first_name: user.firstName,
      last_name: user.lastName,
      email: user.email,
    },
  });

const userLoginRouteSwitch = async () => {
  const res = await store.dispatch(getMe());

  const state = store.getState();
  const relationshipId = state.relationship.id;
  const loverRequestId = state.loverRequest.id;
  const receivedLoverRequests = state.receivedLoverRequests.rows;
  const user = state.user;

  if (!('body' in res)) {
    console.log('redirect to login');
    Actions.login();
  } else if (relationshipId || loverRequestId) {
    console.log('dashboard redirect');
    Actions.dashboard();
    indentifyUser(user);
  } else if (
    _.isArray(receivedLoverRequests) &&
    receivedLoverRequests.length > 0
  ) {
    console.log('request lover redirect');
    //show received lover request
    Actions.confirmLoverRequest();
    indentifyUser(user);
  } else {
    console.log('default');
    Actions.createloverrequest();
    indentifyUser(user);
  }
};

export default userLoginRouteSwitch;
