import { combineReducers, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import user from './user/user.reducer';
import userInvite from './userInvite/userInvite.reducer';
import relationship from './relationship/relationship.reducer';
import lover from './lover/lover.reducer';
import loverRequest from './loverRequest/loverRequest.reducer';
import coin from './coin/coin.reducer';
import jalapeno from './jalapeno/jalapeno.reducer';
import font from './font/font.reducer';
import userEvents from './userEvents/userEvents.reducer';
import relationshipScore from './relationshipScore/relationshipScore.reducer';
import receivedLoverRequests from './receivedLoverRequests/receivedLoverRequests.reducer';
import notifications from './notifications/notifications.reducer';
import loveNote from './loveNote/loveNote.reducer';
import quizItem from './quizItem/quizItem.reducer';

export const reducer = combineReducers({
  user,
  userInvite,
  relationship,
  lover,
  loverRequest,
  coin,
  jalapeno,
  font,
  userEvents,
  relationshipScore,
  receivedLoverRequests,
  notifications,
  loveNote,
  quizItem,
});

const isNotComposeExtension =
  undefined === window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;

export const store = isNotComposeExtension
  ? createStore(reducer, applyMiddleware(thunk))
  : createStore(
      reducer,
      {},
      window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__(applyMiddleware(thunk))
      // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    );

export default store;
