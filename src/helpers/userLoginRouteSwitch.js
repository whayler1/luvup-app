import { Actions } from 'react-native-router-flux';
import _ from 'lodash';

import store from '../redux';
import { getMe } from '../redux/user/user.actions';
import analytics from '../services/analytics';

const userLoginRouteSwitch = async () => {
  const res = await store.dispatch(getMe());

  const state = store.getState();
  const relationshipId = state.relationship.id;
  const loverRequestId = state.loverRequest.id;
  const receivedLoverRequests = state.receivedLoverRequests.rows;
  const user = state.user;

  const analRes = await analytics.identify({
    userId: user.id,
    traits: {
      first_name: user.firstName,
      last_name: user.lastName,
      email: user.email,
    },
  });

  console.log('\n\n analres', analRes);

  if (!('body' in res)) {
    Actions.login();
  } else if (relationshipId || loverRequestId) {
    Actions.dashboard();
  } else if (_.isArray(receivedLoverRequests) && receivedLoverRequests.length > 0) {
    //show received lover request
    Actions.confirmLoverRequest();
  } else {
    Actions.createloverrequest();
  }
};

export default userLoginRouteSwitch;
