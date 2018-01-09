import { combineReducers, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import user from './user/user.reducer';

export const reducer = combineReducers({
  user,
});

export const store = createStore(
  reducer,
  applyMiddleware(thunk)
);
