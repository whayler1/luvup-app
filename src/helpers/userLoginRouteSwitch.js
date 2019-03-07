import { Actions } from 'react-native-router-flux';
import _ from 'lodash';

import { default as store } from '../redux';
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
    Actions.login();
  } else {
    Actions.dashboard();
    // Actions.timeline();
    // Actions.createQuizReview({
    //   quizItem: {
    //     question: 'Who is a bahd baybee?',
    //     choices: ['Me', 'You', 'Anyone'],
    //     senderChoiceIndex: 1,
    //     reward: 4,
    //   },
    // });
    indentifyUser(user);
  }
  // else if (
  //   _.isArray(receivedLoverRequests) &&
  //   receivedLoverRequests.length > 0
  // ) {
  //   //show received lover request
  //   Actions.confirmLoverRequest();
  //   indentifyUser(user);
  // } else {
  //   Actions.createloverrequest();
  //   indentifyUser(user);
  // }
};

export default userLoginRouteSwitch;
