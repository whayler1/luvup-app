import { combineReducers, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import user from './user/user.reducer';
import relationship from './relationship/relationship.reducer';
import lover from './lover/lover.reducer';

export const reducer = combineReducers({
  user,
  relationship,
  lover,
});

export const store = createStore(
  reducer,
  applyMiddleware(thunk)
);
